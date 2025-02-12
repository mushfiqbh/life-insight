import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  createCatalog,
  getCatalog,
  updateCatalog,
  deleteCatalog,
  catalogList,
} from "../controllers/catalogController.js";
const catalogRouter = express.Router();

catalogRouter.get("/", catalogList); // Get list of catalogs
catalogRouter.get("/:catalogId", getCatalog); // Get a specific catalog by ID
catalogRouter.post("/", authMiddleware, createCatalog); // Create a new catalog
catalogRouter.put("/:catalogId", authMiddleware, updateCatalog); // Update a specific catalog by ID
catalogRouter.delete("/:catalogId", authMiddleware, deleteCatalog); // Delete a specific catalog by ID

export default catalogRouter;
