import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

export const loginUser = async (req, res) => {
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

export const registerUser = async (req, res) => {
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
      return res.json({
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

export const getUserInfo = async (req, res) => {
  const userId = req.userId;

  try {
    const userInfo = await userModel.findById(userId, { password: 0 });

    if (!userInfo) {
      return res.status(404).json({ message: "User not found" });
    }

    if (userInfo.permissions.includes("admin")) {
      const userInfoList = await userModel.find({}, { password: 0 });
      return res.status(200).json({ success: true, userInfo, userInfoList });
    }

    res.status(200).json({ success: true, userInfo, userInfoList: [] });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

export const deleteAccount = async (req, res) => {
  const userId = req.userId;

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

export const updateUserInfo = async (req, res) => {
  const userId = req.userId;
  const updateData = req.body;

  try {
    const user = await userModel.findById(userId, { password: 0 });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await userModel.findByIdAndUpdate(userId, updateData);

    res.status(200).json({ success: true, message: "User Info Updated" });
  } catch (error) {
    res.status(500).json({ message: "Error Updating User Info", error });
  }
};

export const updatePermissions = async (req, res) => {
  const userId = req.userId;
  const targetId = req.params.targetId;
  const { permissions } = req.body;

  try {
    const user = await userModel.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "You are not signed in" });
    }

    if (!user.permissions.includes("admin")) {
      return res
        .status(401)
        .json({ success: false, message: "Permission Denied" });
    }

    const target = await userModel.findById(targetId).select("-password");
    if (!target) {
      return res.status(404).json({ message: "Target User Not found" });
    }

    await userModel.findByIdAndUpdate(targetId, {
      $set: { permissions: permissions },
    });

    res
      .status(200)
      .json({ success: true, message: "User permissions updated" });
  } catch (error) {
    res.status(500).json({ message: "Error Updating User Info", error });
  }
};
