import express from "express";
import multer from "multer";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createPost,
  updatePost,
  getPost,
  selectedPosts,
  deletePost,
  incrementViews,
  getAllPosts,
} from "../controllers/postController.js";

const postRouter = express.Router();

// Memory Storage for Buffer
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ROUTES
postRouter.get("/", getAllPosts);
postRouter.get("/filter", selectedPosts);
postRouter.get("/:postId", getPost);

// UPLOAD (Now using memory buffer, not disk)
postRouter.post("/", authMiddleware, upload.single("image"), createPost);

postRouter.put("/:postId", authMiddleware, upload.none(), updatePost);
postRouter.put("/:postId/inc", incrementViews);
postRouter.delete("/:postId", authMiddleware, deletePost);

export default postRouter;
