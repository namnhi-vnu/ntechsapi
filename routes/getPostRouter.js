import express from "express";
const router = express.Router();
import getPosts from "../controllers/getPostCtrollers.js";
router.get("/get-posts", getPosts);

export default router;
