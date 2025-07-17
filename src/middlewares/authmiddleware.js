import { body } from "express-validator"
import jwt from 'jsonwebtoken';
import { validationResult } from "express-validator";


export const validateRegister = [

  body("name").notEmpty().withMessage("name is required"),
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password").isLength({min: 8}).withMessage("Password must be at least 8 characters"),
     
];


export const validLogin = [
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password").isLength({min: 8}).withMessage("Password must be at least 8 characters"),

];


 export const runValidation = (req, res, next) => {
 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
};



export const verifyAccessToken = (req, res, next)=>{
  const authHeader = req.headers.authorization;

  if(!authHeader || !authHeader.startsWith("Bearer ")){
  return res.status(401).json({ message: "Access token missing" });
  }
    
  const token = authHeader.split(" ")[1];
   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }
    req.user = decoded; 
    next();
  });
};