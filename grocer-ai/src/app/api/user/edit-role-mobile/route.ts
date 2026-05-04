import { auth } from "@/auth";
import User from "@/models/user.model";
import connectDb from "@/utils/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
     try{
        await connectDb();
     const {role,mobile}=await request.json();
     const session =await auth();
     const user=await User.findOneAndUpdate({email:session?.user?.email},{role,mobile})
     if(!user){
        return NextResponse.json(
            {message:"user not found"},
            {status:401}
        )
     }
    
    return NextResponse.json(
            user,
            {status:200}

        )
     }
    
    catch(error){
        return NextResponse.json(
            {message:`edit role and mobile error ${error}`},
            {status:500}
        )
    }


}