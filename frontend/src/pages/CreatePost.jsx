import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    await API.post("/posts", { title, description, category });
    navigate("/");
  };

  return (
    <div className="form-container">
      <form onSubmit={submit}>
        <h1 className="community-head-form">Create Post</h1>

        <input
          type="text"
          placeholder="Post title (e.g. Need help with React)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Write your post description here..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Category (Tech, Education, Jobs, etc.)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        />

        <button type="submit">Create</button>
      </form>
    </div>
  );
}
