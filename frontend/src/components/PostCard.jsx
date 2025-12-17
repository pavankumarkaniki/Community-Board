import { useState } from "react";
import API from "../services/api";

export default function PostCard({ post }) {
  const [votes, setVotes] = useState(post.votes || 0);
  const [likes, setLikes] = useState(post.likes?.length || 0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post.comments || []);

  const votePost = async () => {
    try {
      const res = await API.post(`/posts/${post._id}/vote`);
      setVotes(res.data.votes);
    } catch (err) {
      console.error(err);
    }
  };

  const likePost = async () => {
    try {
      const res = await API.post(`/posts/${post._id}/like`);
      setLikes(res.data.likes);
    } catch (err) {
      console.error(err);
    }
  };

  const addComment = async () => {
    if (!comment.trim()) return;

    try {
      const res = await API.post(`/posts/${post._id}/comment`, { text: comment });
      setComments(res.data);
      setComment("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <h3 className="post-title">{post.title}</h3>
        <span className="post-category">{post.category}</span>
      </div>

      <p className="post-desc">{post.description}</p>

      <div className="post-meta">
        <span className="post-user">👤 {post.userId?.name || "Anonymous"}</span>
      </div>

      <div className="post-actions">
        <button className="btn" onClick={votePost}>👍 {votes}</button>
        <button className="btn" onClick={likePost}>❤️ {likes}</button>
      </div>

      <div className="comment-box">
        <input
          type="text"
          placeholder="Write a comment..."
          value={comment}
          onChange={e => setComment(e.target.value)}
        />
        <button className="btn" onClick={addComment}>Post</button>
      </div>

      {comments.length > 0 && (
        <div className="comments">
          {comments.map((c, i) => (
            <p key={i} className="comment">💬 {c.text}</p>
          ))}
        </div>
      )}
    </div>
  );
}
