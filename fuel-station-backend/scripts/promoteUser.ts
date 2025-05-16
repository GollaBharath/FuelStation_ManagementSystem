import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "../src/models/user";

dotenv.config();

const username = process.argv[2];
if (!username) {
  console.error("❌ Provide a username");
  process.exit(1);
}

mongoose
  .connect(process.env.MONGO_URI!)
  .then(async () => {
    const user = await User.findOne({ username });
    if (!user) {
      console.error("❌ User not found");
      process.exit(1);
    }

    console.log("👀 Current role:", user.role);

    user.role = "admin";
    await user.save();

    console.log("✅ Updated role:", user.role);
    process.exit();
  })
  .catch((err) => {
    console.error("❌ DB error:", err);
    process.exit(1);
  });
