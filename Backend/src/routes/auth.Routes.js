import { Router } from "express";
import { loginValidation, registerValidation, emailValidator, passwordValidator } from "../validations/auth.validator.js";

import { authController } from "../controllers/auth.controller.js";
import { identifyUser } from "../middlewares/auth.middleware.js";

const authRouter = Router();



authRouter.post("/register", registerValidation, authController.registerNewUserController);

authRouter.get("/verify-email/:token", authController.verificationUserEmailController);

authRouter.post("/resend-email", emailValidator, authController.resendVerificationEmailController)

authRouter.post("/login", loginValidation, authController.loginUserController);

authRouter.get("/get-me", identifyUser, authController.getUserController);

authRouter.get("/forget-password", emailValidator, authController.sendForgetPasswordEmailController);
authRouter.get("/reset-password/:token", passwordValidator, authController.resetAuthPasswordController);

export default authRouter;