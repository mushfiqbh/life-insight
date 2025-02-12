import express from "express";
import multer from "multer";
import authMiddleware from "../middleware/auth.js";
import {
  createPost,
  updatePost,
  postList,
  getPost,
  deletePost,
  incrementViews,
} from "../controllers/postController.js";

const postRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, callback) => {
    return callback(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({
  storage,
});

postRouter.get("/", postList); // Get list of posts
postRouter.get("/:postId", getPost); // Get a specific post by ID
postRouter.post("/", authMiddleware, upload.single("image"), createPost); // Create a new post
postRouter.put("/:postId", authMiddleware, updatePost); // Update a specific post by ID
postRouter.put("/:postId/inc", incrementViews); // Increment specific post property (e.g. views)
postRouter.delete("/:postId", authMiddleware, deletePost); // Delete a specific post by ID

export default postRouter;
