import express from "express";
import { editAuthor, postAuthor } from "../controllers/authorController.js";
const router = express.Router();

router.post("/", postAuthor);
router.patch("/:id", editAuthor);

export default router;
