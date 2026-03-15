import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.Routes.js";
import { errorHandler } from "./middlewares/ErrorHandler.js";
import morgan from "morgan";
import { askPrompt } from "./services/ai.service.js";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRouter);


// askPrompt("who is god in 10 words?").then((res) => console.log(res))

app.use(errorHandler);

export default app;