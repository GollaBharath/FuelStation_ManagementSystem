import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user";
import { Request,Response } from "express";

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "secret"; // Replace in .env

// Register
router.post("/register", async (req , res) => {
  const { username, password } = req.body;
  try {
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ username, password: hashed });
    res.status(201).json({ message: "User created", user: user.username });
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: "Username may already exist" });
  }
});

// Login
router.post("/login", async (req : Request, res : Response):Promise<any> => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) return res.status(401).json({ error: "Invalid Username" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ error: "Invalid Password" });

  const token = jwt.sign({ id: user._id, username: user.username }, JWT_SECRET, {
    expiresIn: "1d",
  });

  res.json({ token });
});
router.get("/ping", (req, res) => {
  res.send("Auth route is alive");
});
export default router;
