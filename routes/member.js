import express from "express";
import {
  addMember,
  changeMemberShip,
  editMember,
} from "../controllers/memberController.js";
const router = express.Router();
router.patch("/", changeMemberShip);
router.post("/", addMember);
router.patch("/:id", editMember);
export default router;
