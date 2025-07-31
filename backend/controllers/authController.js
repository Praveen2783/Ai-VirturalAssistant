import User from "../models/userModel.js";
import validator from 'validator'
import { genToekn } from "../utils/genToken.js";

import bcrypt from 'bcrypt'



export const SignUp = async (req, res) => {
    try {
        const { name, email, password } = req.body;
       

       const existUser = await User.findOne({ email });

        // validating email format
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }
          // checking for all data to register user
        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing Details" })
        }

        // validating strong password
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        if (existUser) {
            return res.json({ success: false, message: "Email already exist!" })
        } else {
            // hashing user password
            const salt = await bcrypt.genSalt(10); // the more no. round the more time it will take
            const hashedPassword = await bcrypt.hash(password, salt)
            const newUser = await User.create({
                name,
                email,
                password: hashedPassword,
            })
            const token = await genToekn(newUser._id)
            res.cookie("token", token, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
                sameSite: "None",
                secure: true
            })
            return res.json({ success: true, message: "User Successfully Created!", token, newUser })


        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}
export const LogIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existUser = await User.findOne({ email });

        // checking for all data to register user
        if (!email || !password) {
            return res.json({ success: false, message: 'Missing Details' })
        }
        if (!existUser) {
            return res.json({ success: false, message: "User does not exist!" })
        } else {
            const isMatchPass = await bcrypt.compare(password, existUser.password)
            if (!isMatchPass) {
                res.json({ success: false, message: "Invalid credentials" })
            }

            const token = await genToekn(existUser._id)
            res.cookie("token", token, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
               sameSite: "None",
                secure: true
            })
            return res.json({ success: true, message: "User Successfully logIn!", token, existUser })



        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


export const LogOut = async (req, res) => {
    try {
        res.clearCookie('token')
        return res.json({ success: true, message: "User Successfully logOut!" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}