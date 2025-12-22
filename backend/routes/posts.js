// routes/posts.js
import express from "express";
import Post from "../models/Post.js";
import auth from "../middleware/auth.js";

const router = express.Router();

// GET all posts
router.get("/", async (req, res) => {
  res.json(await Post.find().sort({ createdAt: -1 }));
});

// POST new post (guest or logged-in)
router.post("/", auth, async (req, res) => {
  try {
    const post = await Post.create({
      ...req.body,
      userId: req.user ? req.user.id : null,  
    });
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
