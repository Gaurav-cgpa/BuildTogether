import express from "express";
import { protectRoute } from "../middleware/verify.auth.js";
import { getUserInfo, updateDetails } from "../controller/user.controller.js";
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = express.Router();

router.put(
  "/updateDetails",
  protectRoute,
  upload.single("profilePicture"), 
  updateDetails
);

router.get("/getUserInfo/:userId", protectRoute, getUserInfo);

export default router;