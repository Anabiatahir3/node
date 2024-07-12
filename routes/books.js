import express from "express";
import {
  postBook,
  getAllBooks,
  searchBooks,
  getAuthorBook,
  changeBookIssuance,
  checkBookStatus,
} from "../controllers/bookController.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import multer from "multer";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "../uploads");
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});
const upload = multer({ storage: storage });

const router = express.Router();

router.post("/", upload.single("coverImage"), postBook);

router.get("/", getAllBooks);
router.get("/search", searchBooks);
router.get("/search/author", getAuthorBook);
router.get("/issue/:memberId/:isbn", changeBookIssuance);
router.get("/status/:isbn", checkBookStatus);
export default router;
