import { response } from "express";
import geminiRes from "../gemini.js";
import User from "../models/userModel.js";
import connectCloudinary from "../utils/cloudinaryConfig.js";
import moment from "moment";
export const getCurrentUser = async (req, res) => {
    try {
        const userId = req.userId;
        // console.log(userId)
        const user = await User.findById(userId).select("-password")

        if (!user) {
            return res.json({ success: false, message: "User not found!" })
        }

        return res.json({ success: true, user })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}
export const updateAssistant = async (req, res) => {
    try {
        const { assistantName, imageUrl } = req.body;
        let assistantImage;
        if (req.file) {
            assistantImage = await connectCloudinary(req.file.path)
        } else {
            assistantImage = imageUrl
        }

        const user = await User.findByIdAndUpdate(req.userId, {
            assistantName, assistantImage
        }, { new: true }).select("-password")

        return res.json({ success: true, user })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


export const askToAssistant = async (req, res) => {
    try {
        const { command } = req.body
        const user = await User.findById(req.userId);
        user.history.push(command)
        user.save();
        const userName = user.name
        const assistantName = user.assistantName

        const result = await geminiRes(command, assistantName,userName)
        const jsonMatch = result.match(/{[\s\S]*}/)
        if (!jsonMatch) {
            return res.json({ response: "sorry,i can't understand" })
        }
        const gemResult = JSON.parse(jsonMatch[0])
        const type = gemResult.type
        switch (type) {
            case "get_date":
                return res.json({
                    type,
                    userInput: gemResult.userInput,
                    response: `current date is ${moment().format("YYYY-MM-DD")}`
                });
            case "get_time":
                return res.json({
                    type,
                    userInput: gemResult.userInput,
                    response: `current time is ${moment().format("hh:mm A")}`
                });
            case "get_day":
                return res.json({
                    type,
                    userInput: gemResult.userInput,
                    response: `today is ${moment().format("dddd")}`
                });
            case "get_month":
                return res.json({
                    type,
                    userInput: gemResult.userInput,
                    response: `this month is ${moment().format("MMMM")}`
                });
            case "general":
            case "google_search":
            case "youtube_search":
            case "youtube_play":
            case "calculator_open":
            case "instagram_open":
            case "facebook_open":
            case "weather-show":
            case "chatgpt":
                return res.json({
                    type,
                    userInput: gemResult.userInput,
                    response: gemResult.response
                })

            default:
                return res.json({response:"I didn't understand that command"})          
         }
      

    } catch (error) {
    
       return res.json({ response:"ask assistant error" })
    }
}

