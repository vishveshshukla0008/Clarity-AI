import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.Routes.js";
import { errorHandler } from "./middlewares/ErrorHandler.js";
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);




app.use(errorHandler);

export default app;