import express, { Request, Response } from "express";
import { verifyToken } from "../middlewares/authmiddleware";

const router = express.Router();

router.get("/protected", verifyToken, (req: Request, res: Response) => {
  res.json({ message: `Welcome, ${req.user?.username}` });
});
export default router;
