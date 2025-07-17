import bcrypt from "bcryptjs"
import User from "../models/user.js"
import { accessToken, refreshToken, newAccessToken } from "../utils/generateTokens.js";
import jwt from "jsonwebtoken";

  //register
  export const registerUser = async(req,res)=> { 

    try{

      const {name , email, password, role} = req.body;

      const existingUser = await User.findOne({email})
      if(existingUser)
        return res.status(400).json({ message: " Email already exists " })

      const hashedPassword = await bcrypt.hash(password, 10)

      const newUser = new User({ name, email, password: hashedPassword, role});
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
       
        const access = accessToken( user._id, user.role );
        const refresh = refreshToken(user._id);
      
      res.cookie("refreshToken", refresh, {
        httpOnly: true,
        secure: process.env.NODE_ENV=== "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
      })
      .json({
        message: "Login successful",
        access
      });
    }catch (error) {

    res.status(500).json({ message: "Server error", error: error.message });
  }}


//refresh
  export const refreshAccessToken = async(req,res)=>{
    try{
      const token = req.cookies.refreshToken;
      if (!token) 
        return res.status(401).json({ message: "No token provided" });

      jwt.verify(token, process.env.REFRESH_ACCESS_TOKEN, (err, decode)=>{
      if(err)
        return res.status(401).json({message: "Invalid token"})

      const access = newAccessToken(decode.id)
      res.json({ accessToken: access });

    });
  }
    catch(error){
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }

  
  //Profile
  export const getProfile = (req,res)=>{
    res.status(200).json({message: "Welcome to your profile",
    user: req.user,
  });
};


//admin
export const isAdmin = (req, res)=>{
    res.status(200).json({message: "Welcome, admin",
})
}