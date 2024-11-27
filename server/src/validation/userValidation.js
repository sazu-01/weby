

//packages
import { body } from "express-validator";

export const validateUserRegistration = [
    
  body("FullName")
    .trim()
    .notEmpty()
    .withMessage("name is required")
    .isLength({ min: 3, max: 31 })
    .withMessage("name should be at least 3-31 characters"),

  body("Email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("invalid email address"),

    body("PhoneNumber") 
    .trim()
    .notEmpty()
    .withMessage("phone number is required")
    .matches(/^(\+880|880|0)1[3-9]\d{8}$/)
    .withMessage("invalid bangladesh phone number formate"),

  body("AlterPhoneNumber")
    .optional()
    .trim()
    .matches(/^(\+880|880|0)1[3-9]\d{8}$/)
    .withMessage("invalid bangladesh phone number formate"),  

  body("Password")
    .trim()
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6 })
    .withMessage("password should be at least 6 characters"),

  body("Image").optional(),

];


export const validateUserLogin = [
  body("Email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("invalid email address"),

    body("Password")
    .trim()
    .notEmpty()
    .withMessage("password is required")

];