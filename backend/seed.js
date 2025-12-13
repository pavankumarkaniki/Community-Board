import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import Post from "./models/Post.js";

dotenv.config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    // Clear existing data
    await User.deleteMany({});
    await Post.deleteMany({});

    // Create users
    const hashedPassword = await bcrypt.hash("123456", 10);
    const user1 = await User.create({ name: "Pavan", email: "pavan@example.com", password: hashedPassword });
    const user2 = await User.create({ name: "Ravi", email: "ravi@example.com", password: hashedPassword });

    console.log("Test users created");

    // Create posts
    const posts = [
      {
        title: "Welcome to Community Board",
        description: "This is the first post. Feel free to add yours!",
        category: "General",
        userId: user1._id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Tips for Learning React",
        description: "React is a popular library. Practice by building small projects.",
        category: "Education",
        userId: user2._id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Big News in Tech",
        description: "Tech giants are merging. Exciting developments ahead!",
        category: "Technology",
        userId: user1._id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Community Event",
        description: "Join us this weekend for a fun community meetup.",
        category: "Events",
        userId: user2._id,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: "Small Tip: Stay Hydrated",
        description: "Remember to drink water while working on your projects.",
        category: "Health",
        userId: user1._id,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    await Post.insertMany(posts);
    console.log("Seed posts created");

    console.log("Seeding done!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
