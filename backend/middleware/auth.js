// middleware/optionalAuth.js
import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  const token = req.cookies?.token;
  if (token) {
    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      console.warn("Invalid token ignored:", err.message);
    }
  }
  next();  
};

export default auth;

