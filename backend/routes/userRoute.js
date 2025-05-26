import express from "express";
import {
  getUserInfo,
  loginUser,
  registerUser,
  deleteAccount,
  updateUserInfo,
  updatePermissions,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const userRouter = express.Router();

userRouter.get("/", authMiddleware, getUserInfo); // Get current user's info
userRouter.post("/login", loginUser); // Authenticate a user
userRouter.post("/register", registerUser); // Register a new user
userRouter.delete("/", authMiddleware, deleteAccount); // Delete current user's account
userRouter.put("/", authMiddleware, updateUserInfo); // Update current user's info
userRouter.put("/:targetId", authMiddleware, updatePermissions); // Admin updates another user

export default userRouter;
