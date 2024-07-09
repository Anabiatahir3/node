import express from "express";
import {
  addMember,
  changeMemberShip,
} from "../controllers/memberController.js";
const router = express.Router();

router.post("/", addMember);
export default router;
router.patch("/", changeMemberShip);
