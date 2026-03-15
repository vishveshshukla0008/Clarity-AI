import { body, validationResult } from "express-validator";
import AppError from "../utils/AppError.js";

const validater = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new AppError(400, "Validation Failed", errors.array());
  }

  next();
};

export const registerValidation = [
  body("username")
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters")
    .isLength({ max: 50 })
    .withMessage("Username cannot exceed 50 characters")
    .trim(),

  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .isLength({ max: 16 })
    .withMessage("Password must not exceed 16 characters")
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/)
    .withMessage(
      "Password must contain uppercase, lowercase, number, and special character",
    )
    .trim(),

  body("fullname")
    .notEmpty()
    .withMessage("Fullname is required")
    .isLength({ min: 3 })
    .withMessage("Fullname must be at least 3 characters")
    .isLength({ max: 20 })
    .withMessage("Fullname cannot exceed 20 characters")
    .trim(),

  validater,
];

export const emailValidator = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),
  validater,
];

export const loginValidation = [
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .isLength({ max: 16 })
    .withMessage("Password must not exceed 16 characters")
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/)
    .withMessage(
      "Password must contain uppercase, lowercase, number, and special character",
    )
    .trim(),

  validater,
];

export const passwordValidator = [
  body("newPassword")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .isLength({ max: 16 })
    .withMessage("Password must not exceed 16 characters")
    .matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/)
    .withMessage(
      "Password must contain uppercase, lowercase, number, and special character",
    )
    .trim(),
  validater,
];
