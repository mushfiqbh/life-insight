import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createCondition,
  getCondition,
  getConditionById,
  updateCondition,
  deleteCondition,
  conditionList,
  conditionIndex,
} from "../controllers/conditionController.js";
import multer from "multer";

const conditionRouter = express.Router();
const upload = multer();

conditionRouter.get("/index", conditionIndex);
conditionRouter.get("/", conditionList); // Get list of Conditions
conditionRouter.get("/:label", getCondition); // Get a specific Condition by ID
conditionRouter.get("/byid/:conditionId", getConditionById); // Get a specific Condition by ID
conditionRouter.post("/", authMiddleware, upload.none(), createCondition); // Create a new Condition
conditionRouter.put(
  "/:conditionId",
  authMiddleware,
  upload.none(),
  updateCondition
); // Update a specific Condition by ID
conditionRouter.delete("/:conditionId", authMiddleware, deleteCondition); // Delete a specific Condition by ID

export default conditionRouter;
