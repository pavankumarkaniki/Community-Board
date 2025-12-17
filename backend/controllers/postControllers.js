import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

/* CREATE POST */
export const createPost = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    const post = await Post.create({
      title,
      description,
      category,
      userId: req.user.id,
    });

    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* GET ALL POSTS */
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* GET SINGLE POST */
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("userId", "name");

    if (!post) return res.status(404).json({ message: "Post not found" });

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* UPDATE POST */
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    post.title = req.body.title || post.title;
    post.description = req.body.description || post.description;
    post.category = req.body.category || post.category;

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* DELETE POST */
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.userId.toString() !== req.user.id)
      return res.status(403).json({ message: "Unauthorized" });

    await post.deleteOne();
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}; 

/* VOTE */
export const votePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { votes: 1 } },
      { new: true }
    );
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* LIKE */
export const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.likes.includes(req.user.id)) {
      return res.status(400).json({ message: "Already liked" });
    }

    post.likes.push(req.user.id);
    await post.save();

    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* COMMENT */
export const addComment = async (req, res) => {
  try {
    const comment = await Comment.create({
      text: req.body.text,
      postId: req.params.id,
      userId: req.user.id
    });

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
