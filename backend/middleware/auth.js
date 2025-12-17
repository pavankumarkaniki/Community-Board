import jwt from "jsonwebtoken";

const getTokenFromCookie = (cookieHeader) => {
  if (!cookieHeader) return null;
  const token = cookieHeader
    .split("; ")
    .find(c => c.startsWith("token="));
  return token?.split("=")[1];
};

const auth = (req, res, next) => {
  const token = getTokenFromCookie(req.headers.cookie);
  if (!token) return res.status(401).json({ message: "Unauthorized" });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ message: "Invalid token" });
  }
};

export default auth