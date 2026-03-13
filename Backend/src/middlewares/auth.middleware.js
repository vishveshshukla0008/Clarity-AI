import jwt from "jsonwebtoken";
import AppError from "../utils/AppError.js";
import { asyncWrapper } from "../utils/asyncWrapper.js";

export const identifyUser = asyncWrapper(async (req, res, next) => {
    const token = req.cookies.token; // or add header check if needed

    if (!token) throw new AppError(401, "Unauthorized Access! Please signup/login.");

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { id: decoded.id, email: decoded.email };
        next();
    } catch (error) {
        throw new AppError(401, "Unauthorized!");
    }
});