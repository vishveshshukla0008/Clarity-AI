import { Router } from "express";
import { loginValidation, registerValidation, resendEmailValidator } from "../validations/auth.validator.js";

import { authController } from "../controllers/auth.controller.js";
import { identifyUser } from "../middlewares/auth.middleware.js";

const authRouter = Router();



authRouter.post("/register", registerValidation, authController.registerNewUserController);

authRouter.get("/verify-email/:token", authController.verificationUserEmailController);

authRouter.post("/resend-email", resendEmailValidator, authController.resendVerificationEmailController)

authRouter.post("/login", loginValidation, authController.loginUserController);

authRouter.get("/get-me", identifyUser, authController.getUserController)


export default authRouter;