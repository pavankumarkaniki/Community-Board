import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors({
  origin: "https://YOUR-FRONTEND-URL.onrender.com",
  credentials: true
}));

// Root route (fix 404)
app.get("/", (req, res) => {
  res.json({ message: "Community Board API running 🚀" });
});

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(process.env.PORT || 5000, () =>
      console.log("Server running")
    );
  })
  .catch(err => console.error(err));
