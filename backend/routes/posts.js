import express from "express";
import Post from "../models/Post.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const posts = await Post.find().populate("userId", "name");
  res.json(posts);
});

router.post("/", auth, async (req, res) => {
  const post = await Post.create({
    ...req.body,
    userId: req.user.id
  });
  res.status(201).json(post);
});

export default router;
