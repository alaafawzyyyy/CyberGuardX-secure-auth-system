import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({

name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
},

email: {
    type: String,
    required: true,
    unique: true,
    lowerCase: true,
    trim: true
},

password: {
    type: String,
    required: true,
    minlength: 8
},

role: { 
    type: String, 
    enum: ['user', 'admin'], 
    default: 'user' }
}

, {timestamps: true})

const User=mongoose.model("User", UserSchema)

export default User;