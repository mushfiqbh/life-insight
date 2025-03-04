import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import userRouter from "./routes/userRoute.js";
import postRouter from "./routes/postRoute.js";
import miscRouter from "./routes/miscRoute.js";
import overviewRouter from "./routes/overviewRoute.js";

// app config
const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(cors());

// database connection
mongoose.connect(process.env.DATABASE_URL).then(() => {
  const env = process.env.NODE_ENV || "development";
  console.log(`Database Connected to ${env} environment`);
});

// api endpoint
app.use("/api/images", express.static("uploads"));
app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/catalogs", overviewRouter);
app.use("/api/search", miscRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
