import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import userRouter from "./routes/userRoute.js";
import postRouter from "./routes/postRoute.js";
import conditionRouter from "./routes/conditionRoute.js";
import searchRouter from "./routes/searchRoute.js";
import codechefRouter from "./routes/codechefRoute.js";

// app config
const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors());

// database connection
mongoose.connect(process.env.DATABASE_URL).then(() => {
  const env = process.env.NODE_ENV || "Development";
  console.log(`Database Connected to ${env} environment`);
});

// api endpoint
app.use("/api/image", express.static("uploads"));
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/conditions", conditionRouter);
app.use("/api/search", searchRouter);

// CodeChef API route Personal Purpose, not related to this project
app.use("/api/codechef", codechefRouter);

app.get("/", (req, res) => {
  res.send("Hello World! Server is working.");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
