import jwt from "jsonwebtoken";
import { asyncWrapper } from "../utils/asyncWrapper.js";
import { userModel } from "../models/user.model.js";
import AppError from "../utils/AppError.js";
import {
  sendForgetPasswordLink,
  sendResetPasswordConfirmationEmail,
  sendVerificationConfirmationEmail,
  sendVerificationEmail,
} from "../services/auth.service.js";

/***
 * @route POST /api/auth/register
 * @description Registering an user on server and send them verification email
 * @access  Public
 */
const registerNewUserController = asyncWrapper(async (req, res) => {
  const { username, email, password, fullname } = req.body;

  const existingUser = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (existingUser)
    throw new AppError(
      409,
      "User already exists with the provided email or username",
    );

  let user = await userModel.create({
    fullname,
    username,
    email,
    password,
  });

  await sendVerificationEmail(user);

  user = user.toObject();
  delete user.password;
  delete user.isVerified;
  delete user.emailVerificationToken;
  delete user.emailVerificationExpires;

  return res.status(201).json({
    success: true,
    message: "User registered successfully",
    user,
  });
});

/***
 * @route GET /api/auth/verify-email/:token
 * @description verify an user on the basis of token in pramas 'token' makes the verified field true for accessing Private user routes !
 * @access  Public
 */
const verificationUserEmailController = asyncWrapper(async (req, res) => {
  const { token } = req.params;

  const user = await userModel
    .findOne({ emailVerificationToken: token })
    .select("+emailVerificationToken +emailVerificationExpires +isVerified");

  if (!user) throw new AppError(404, "User does not exist");

  if (user.emailVerificationExpires < Date.now()) {
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();
    throw new AppError(400, "Verification link expired");
  }

  if (user.isVerified) throw new AppError(400, "User is already verified !");

  user.isVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;

  await user.save();

  sendVerificationConfirmationEmail(user);

  return res
    .status(200)
    .json({ success: true, message: "Email verified successfully !" });
});

/***
 * @route POST /api/auth/resend-email
 * @description Takes the 'email' in body and after validation resend the request to user and update the token and time .
 * @access  Public
 */
const resendVerificationEmailController = asyncWrapper(async (req, res) => {
  const { email } = req.body;

  // Find a user on this :
  const user = await userModel.findOne({ email }).select("+isVerified");

  console.log(user);

  if (!user) throw new AppError(404, "User does not exist !");
  if (user.isVerified) throw new AppError(400, "Email is already verified !");

  // resend email :

  await sendVerificationEmail(user);

  return res
    .status(200)
    .json({ success: true, message: "Verification email sent" });
});

/***
 * @route POST /api/auth/login
 * @description Login a user on server after checking credentials and email verification !
 * @access  Public
 */

const loginUserController = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;

  let user = await userModel
    .findOne({ email })
    .select("+password +isVerified");

  if (!user || !(await user.comparePassword(password))) {
    throw new AppError(401, "Invalid email or password");
  }

  if (!user.isVerified) {
    throw new AppError(400, "Please verify your email first");
  }

  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  user = user.toObject();
  delete user.password;
  delete user.isVerified;

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return res.status(200).json({
    success: true,
    message: "Logged in successfully",
    user
  });
});

/***
 * @route GET /api/auth/get-me
 * @description Return a user after passing the identifyUser Middleware !
 * @access  protected
 */

const getUserController = asyncWrapper(async (req, res) => {
  const user = await userModel.findById(req.user.id);
  if (!user) throw new AppError(404, "User does not exist !");

  return res
    .status(200)
    .json({ message: "User Fetched Success !", success: true, user });
});

/***
 * @route GET /api/auth/forget-password
 * @description access the email in body and sending the reset password template on the user email :
 * @access  Public
 */

const sendForgetPasswordEmailController = asyncWrapper(async (req, res) => {
  const { email } = req.body;

  const user = await userModel.findOne({ email }).select("+resetPasswordToken +resetPasswordTokenExpires +isVerified");

  if (!user) throw new AppError(404, "User does not exist !");

  sendForgetPasswordLink(user);

  return res.status(200).json({ success: true, message: "Reset password link has been sent on your email !" });
});


/***
 * @route POST /api/auth/reset-password/:token
 * @description Reseting the password after validating the users token and update the password in databases .
 * @access  protected
 */


const resetAuthPasswordController = asyncWrapper(async (req, res) => {
  const { token } = req.params;

  const user = await userModel.findOne({ resetPasswordToken: token }).select("+resetPasswordToken +resetPasswordTokenExpires +password");

  if (!user) throw new AppError(404, "Invalid Token !");

  if (user.resetPasswordTokenExpires < Date.now()) {
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpires = undefined;
    await user.save();
    throw new AppError(400, "Link expired !")
  }
  const { newPassword } = req.body;

  user.password = newPassword;

  user.resetPasswordToken = undefined;
  user.resetPasswordTokenExpires = undefined;


  await user.save();

  await sendResetPasswordConfirmationEmail(user);

  return res.status(200).json({ success: true, message: "Password Reset Successfully !" })
})


export const authController = {
  registerNewUserController,
  verificationUserEmailController,
  resendVerificationEmailController,
  loginUserController,
  getUserController,
  sendForgetPasswordEmailController,
  resetAuthPasswordController
};
