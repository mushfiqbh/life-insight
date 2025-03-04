import express from "express";
import { search } from "../controllers/miscController.js";

const miscRouter = express.Router();

miscRouter.get("/:query", search);

export default miscRouter;
