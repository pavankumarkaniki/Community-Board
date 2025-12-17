import express from "express";
import {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
  votePost,
  likePost,
  addComment,
} from "../controllers/postControllers.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getPosts);
router.get("/:id", getPostById);

router.post("/", auth, createPost);
router.put("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);

// NEW FEATURES
router.post("/:id/vote", auth, votePost);
router.post("/:id/like", auth, likePost);
router.post("/:id/comment", auth, addComment);

export default router;
