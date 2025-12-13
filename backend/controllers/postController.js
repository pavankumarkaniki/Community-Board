import Post from "../models/Post.js";

/**
 * @desc    Create a new post
 * @route   POST /api/posts
 * @access  Private
 */
export const createPost = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({ message: "All fields required" });
    }

    const post = await Post.create({
      title,
      description,
      category,
      userId: req.user.id
    });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get all posts
 * @route   GET /api/posts
 * @access  Public
 */
export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Get single post
 * @route   GET /api/posts/:id
 * @access  Public
 */
export const getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      "userId",
      "name"
    );

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Update post (owner only)
 * @route   PUT /api/posts/:id
 * @access  Private
 */
export const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    post.title = req.body.title || post.title;
    post.description = req.body.description || post.description;
    post.category = req.body.category || post.category;

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @desc    Delete post (owner only)
 * @route   DELETE /api/posts/:id
 * @access  Private
 */
export const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) return res.status(404).json({ message: "Post not found" });

    if (post.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await post.deleteOne();
    res.json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
