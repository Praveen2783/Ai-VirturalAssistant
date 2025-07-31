import express from "express";
import { LogIn, LogOut, SignUp } from "../controllers/authController.js";



const authRouter = express.Router();

authRouter.post('/signup',SignUp);
authRouter.post('/login',LogIn)
authRouter.get('/logout',LogOut)



export default authRouter