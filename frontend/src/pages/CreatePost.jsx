// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import API from "../services/api";  

// export default function CreatePost() {
//   const navigate = useNavigate();

//   const [title, setTitle] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");

//   const submit = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await API.post("/posts", { title, description, category });
//       console.log("Post created:", res.data);
//       navigate("/"); // redirect after successful post
//     } catch (err) {
//       console.error("Error creating post:", err);
//       alert("Something went wrong while creating the post.");
//     }
//   };

//   return (
//     <div className="form-container">
//       <form onSubmit={submit}>
//         <h1 className="community-head-form">Create Post</h1>

//         <input
//           type="text"
//           placeholder="Post title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           required
//         />

//         <textarea
//           placeholder="Write your post description here..."
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           required
//         />

//         <input
//           type="text"
//           placeholder="Category"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           required
//         />

//         <button type="submit">Create</button>
//       </form>
//     </div>
//   );
// }



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

export default function CreatePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/posts", { title, description, category });
      console.log("Post created:", res.data);
      navigate("/");
    } catch (err) {
      console.error("Error creating post:", err);
      if (err.response?.status === 401) {
        alert("Session expired. Please login again!");
      } else {
        alert("Something went wrong while creating the post.");
      }
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={submit}>
        <h1 className="community-head">Create Post</h1>
        <input type="text" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} required />
        <input type="text" placeholder="Category" value={category} onChange={e => setCategory(e.target.value)} required />
        <button type="submit">Create</button>
      </form>
    </div>
  );
}
