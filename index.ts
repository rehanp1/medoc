import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
import dbConnect from "./config/db";
import sampleRouter from "./routes/sample.routes";
import authRouter from "./routes/auth.routes";

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.use("/", sampleRouter);
app.use("/auth", authRouter);

dbConnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.log(err.message));
