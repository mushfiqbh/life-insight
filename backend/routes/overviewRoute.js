import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  createOverview,
  getOverview,
  updateOverview,
  deleteOverview,
  overviewList,
  overviewIndex,
} from "../controllers/overviewController.js";
const overviewRouter = express.Router();

overviewRouter.get("/", overviewIndex);
overviewRouter.get("/page/:pageNo", overviewList); // Get list of Overviews
overviewRouter.get("/:label", getOverview); // Get a specific Overview by ID
overviewRouter.post("/", authMiddleware, createOverview); // Create a new Overview
overviewRouter.put("/:overviewId", authMiddleware, updateOverview); // Update a specific Overview by ID
overviewRouter.delete("/:overviewId", authMiddleware, deleteOverview); // Delete a specific Overview by ID

export default overviewRouter;
