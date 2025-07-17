import { body } from "express-validator"



export const validateRegister = [

  body("name").notEmpty().withMessage("name is required"),
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password").isLength({min: 8}).withMessage("Password must be at least 8 characters"),
     
];

export const validLogin = [
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password").isLength({min: 8}).withMessage("Password must be at least 8 characters"),

];