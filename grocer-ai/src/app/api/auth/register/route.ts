import User from "@/models/user.model";
import connectDb from "@/utils/db";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST (req:NextRequest){
   try{
      connectDb();
       const {name,email,password,mobile}= await req.json();
       const existUser=await User.findOne({email:email});
       if(existUser){
        return NextResponse.json(
            { message:"User Exist Already" },
            {status:400}
         )
       }
       if(password.length<8 || password.length>80){
        return NextResponse.json(
            {Message:"Password length must be at least 8 characters"},
            {status:400}
        )
       }
       if(password.length>80){
        return NextResponse.json(
            {Message:"Password length must be contain 8 characters to 80 character"},
            {status:400}
        )
       }
       const hashPassword=await bcrypt.hash(password, 10);
       const user=await User.create({
        name:name,
        email:email,
        password:hashPassword,
        mobile:mobile                                                  
       })
       return NextResponse.json(
          {message:"user registered successfully",
            user
          },
          {status:200 }
        
       )
   }
   catch(error){
         return NextResponse.json(
            {message:`Register Error: ${error}`},
            {status:500}
         )
   }

}