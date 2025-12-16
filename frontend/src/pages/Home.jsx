import { useEffect, useState } from "react"; 
import API from "../services/api";


export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    API.get("/posts").then(res => setPosts(res.data));
  }, []);

  return (
    <div className="community-container">
      <h1 className="community-head">Community Posts</h1>
      {posts.map(post => (
        <div key={post._id}>
          <h3>{post.title}</h3>
          <p>{post.description}</p>
          <small>{post.userId?.name}</small>
        </div>
      ))}
    </div>
  );
}
