import bcrypt from "bcryptjs"
import User from "../models/user.js"
import jwt from "jsonwebtoken";


//register
export const registerUser = async(req,res)=> { 

    try{

      const {name , email, password} = req.body;

      const existingUser = await User.findOne({email})
      if(existingUser)
        return res.status(400).json({ message: " Email already exists " })

      const hashedPassword = await bcrypt.hash(password, 10)

      const newUser = new User({ name, email, password: hashedPassword});
      await newUser.save()
    
      res.status(200).json({ message: " User registered successfully ✅ "})

  } catch (error) {

      res.status(500).json({message: " server error "}, error)}
    
  }


//Login
export const loginUser = async(req,res)=>{

    try{

      const {email , password} = req.body; 

      const user = await User.findOne({email});
      if(!user)
        return res.status(400).json({message: "there is no account with this email"})

      const isMatch = await bcrypt.compare(password  , user.password)
      if(!isMatch)
        return res.status(400).json({message: "wrong password"})
       

      const accessToken = jwt.sign(
        {id: user._id, role: user.role},
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn: "15m"}
      )

      const refreshToken = jwt.sign(
        {id: user._id},
        process.env.REFRESH_ACCESS_TOKEN,
        {expiresIn: "7d"}
      )

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV=== "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
      })
      .json({
        message: "Login successful",
        accessToken
      });
}   catch (error) {

    res.status(500).json({ message: "Server error", error: error.message });
}}