import express from "express";
import "dotenv/config";
import connectDb from "./utils/dbConfig.js";
import connectCloudinary from "./utils/cloudinaryConfig.js";

import authRouter from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
import userRouter from "./routes/userRoutes.js";
import geminiRes from "./gemini.js";

const app = express();
const port = process.env.PORT ||3000


// connectCloudinary();


// middlewares
app.use(cors({
    origin:"http://localhost:8000",
    credentials:true}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

//api end-points 
app.use('/api/auth',authRouter);
app.use('/api/user',userRouter);





app.listen(port,()=>{
    connectDb();
    console.log("server run at port " + port)
})
