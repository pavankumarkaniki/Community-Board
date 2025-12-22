import { useEffect, useState } from "react";
import API from "../services/api";
import PostCard from "../components/PostCard";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get("/posts").then((res) => setPosts(res.data));
  }, []);

  return (
    <div className="community-container">
      <h1 className="community-head">Community Posts</h1>

      <div className="posts-grid">
        {posts.length === 0 ? (
          <p className="empty-text">No posts yet</p>
        ) : (
          posts.map(post => (
            <PostCard key={post._id} post={post} />
          ))
        )}
      </div>
    </div>
  );
}
