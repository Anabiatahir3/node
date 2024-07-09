import express from "express";
import { createLibrary } from "../controllers/libraryController.js";
const router = express.Router();

router.post("/", createLibrary);
export default router;
