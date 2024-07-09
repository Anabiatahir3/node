import express from "express";
import { postAuthor } from "../controllers/authorController";
const router = express.Router();

router.post("/author", postAuthor);

export default router;
