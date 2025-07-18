import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/authRoutes.js"
import cookieParser from "cookie-parser";


dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);


app.get("/",(req,res)=>{
    res.send("server is running")
})


mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log(" ✅ connected to MongoDB")

    const PORT = process.env.PORT || 5000;
    app.listen( PORT, ()=>{
        console.log(`surver is running on http://localhost:${PORT}`)})


}).catch((err)=>{
    console.error("❌ Failed to connect to MongoDB:", err)
})

