import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Password Did Not Match" });
    }

    const token = createToken(user._id);

    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Interal Server Error" });
  }
};

// register user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({
        success: false,
        message: "This Email is Already Registered",
      });
    }
    // validating email format and strong password
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Enter Valid Email" });
    }

    if (password.length < 8) {
      res.json({
        success: false,
        message: "Enter at Least 8 Digit Password",
      });
    }

    // hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error Occurred" });
  }
};

const getUserInfo = async (req, res) => {
  const { userId } = req.body;
  try {
    const userInfo = await userModel.findById(userId, { password: 0 });

    if (!userInfo) {
      return res.status(404).json({ message: "User not found" });
    }

    if (userInfo.permission.includes("admin")) {
      const userInfoList = await userModel.find({}, { password: 0 });
      return res.status(200).json({ success: true, userInfo, userInfoList });
    }

    res.status(200).json({ success: true, userInfo, userInfoList: [] });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

const deleteAccount = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Account Not Found" });
    }
    await userModel.findByIdAndDelete(userId);
    res.status(200).json({ message: "Account Deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error Deleting Account", error });
  }
};

const updateUserInfo = async (req, res) => {
  const { userId, ...rest } = req.body;

  try {
    const user = await userModel.findById(userId, { password: 0 });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await userModel.findByIdAndUpdate(userId, rest); // rest = Request body except userId

    res.status(200).json({ success: true, message: "User Info Updated" });
  } catch (error) {
    res.status(500).json({ message: "Error Updating User Info", error });
  }
};

const updateUserInfoByAdmin = async (req, res) => {
  const { userId, ...rest } = req.body;
  const targetId = req.params.userId;

  try {
    const user = await userModel.findById(userId, { password: 0 });
    if (!user) {
      return res.status(404).json({ message: "Admin User Not found" });
    }

    if (!user.permission.includes("admin")) {
      return res
        .status(401)
        .json({ success: false, message: "Permission Denied" });
    }

    const target = await userModel.findById(targetId, { password: 0 });
    if (!target) {
      return res.status(404).json({ message: "Target User Not found" });
    }
    await userModel.findByIdAndUpdate(targetId, rest); // rest = Request body except userId

    res.status(200).json({ success: true, message: "User Info Updated" });
  } catch (error) {
    res.status(500).json({ message: "Error Updating User Info", error });
  }
};

export {
  loginUser,
  registerUser,
  getUserInfo,
  deleteAccount,
  updateUserInfo,
  updateUserInfoByAdmin,
};
