import mongoose  from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    assistantName:{
        type:String,
        // required:true
    },
    assistantImage:{
        type:String,
        // required:true
    },
    history:[{
        type:String,
        // required:true
    }],
   
},{timestamps:true})
const User = mongoose.model.User || mongoose.model('User',userSchema)

export default  User