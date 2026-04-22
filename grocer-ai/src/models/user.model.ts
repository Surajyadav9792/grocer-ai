import mongoose from "mongoose";

interface IUser{
    _id:mongoose.Types.ObjectId,
    name:string,
    email:string,
    password:string,
    mobile:string,
    role:"user"|"deliveryBoy"|"admin"
}
const userSchema=new mongoose.Schema<IUser>({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    mobile:{
           type:String,
           required:true
    },
    role:{
        type:String,
        enum:["user","deliveryBoy","admin"],
        default:"user"
    }
   
 },
 {timestamps:true})

 //creating Model
 //if the model exist then the older model is considered and if not exist then new model will be created
 const User=mongoose.models.User || mongoose.model("User",userSchema)
 export default User;