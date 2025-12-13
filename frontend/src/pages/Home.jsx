import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/posts");
        setPosts(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="container">
      <h1>Community Board Posts</h1>
      {posts.length === 0 ? (
        <p>No posts yet</p>
      ) : (
        posts.map((post) => (
          <div key={post._id} className="post-card">
            <h3>{post.title}</h3>
            <p>{post.description}</p>
            <small>Category: {post.category}</small>
            <br />
            <small>By: {post.userId?.name || "Unknown"}</small>
          </div>
        ))
      )}
    </div>
  );
}

