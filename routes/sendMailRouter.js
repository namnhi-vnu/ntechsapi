import express from "express";
import sendEmail from "../controllers/sendMailControllers.js";
const router = express.Router();

router.post("/send-mail", sendEmail);

export default router;
