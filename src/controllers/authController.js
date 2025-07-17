import bcrypt from "bcryptjs"
import User from "../models/user.js"


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