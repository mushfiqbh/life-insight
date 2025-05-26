import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createOverview,
  getOverview,
  getOverviewById,
  updateOverview,
  deleteOverview,
  overviewList,
  overviewIndex,
} from "../controllers/overviewController.js";
import multer from "multer";

const overviewRouter = express.Router();
const upload = multer();

overviewRouter.get("/", overviewIndex);
overviewRouter.get("/page/:pageNo", overviewList); // Get list of Overviews
overviewRouter.get("/:label", getOverview); // Get a specific Overview by ID
overviewRouter.get("/byid/:labelId", getOverviewById); // Get a specific Overview by ID
overviewRouter.post("/", authMiddleware, upload.none(), createOverview); // Create a new Overview
overviewRouter.put(
  "/:overviewId",
  authMiddleware,
  upload.none(),
  updateOverview
); // Update a specific Overview by ID
overviewRouter.delete("/:overviewId", authMiddleware, deleteOverview); // Delete a specific Overview by ID

export default overviewRouter;
