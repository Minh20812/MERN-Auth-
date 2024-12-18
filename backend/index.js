import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import connectDB from "./config/db.js";
import userRoutes from "./src/routers/userRoutes.js";

dotenv.config();
const port = process.env.PORT || 5001;

connectDB();
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173/",
      "https://mern-auth-five-sooty.vercel.app/",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => console.log(`Server running on port ${port}`));
