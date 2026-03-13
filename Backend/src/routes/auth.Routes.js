import { Router } from "express";
import { registerValidation, resendEmailValidator } from "../validations/auth.validator.js";
import { authController } from "../controllers/auth.controller.js";

const authRouter = Router();



authRouter.post("/register", registerValidation, authController.registerNewUserController);

authRouter.get("/verify-email/:token", authController.verificationUserEmailController);

authRouter.post("/resend-email", resendEmailValidator, authController.resendVerificationEmailController)





export default authRouter;