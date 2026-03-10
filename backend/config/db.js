import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      `mongodb+srv://folarinstephen21_db_user:${process.env.MONGODB_PASS}@cluster0.5muun48.mongodb.net/?appName=food-del`
    )
    .then(() => console.log("db connected successfully"));
};

"7O0V8cHp64QDhSDm";