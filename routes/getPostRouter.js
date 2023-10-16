import express from "express";
const router = express.Router();
import getPosts, { getPostsDetail } from "../controllers/getPostCtrollers.js";
router.get("/get-posts", getPosts);
router.get("/post-detail/:slug", getPostsDetail);
export default router;
