import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import connectDb from "./utils/db"
import User from "./models/user.model"
import bcrypt from "bcrypt";
//  next auth is a function which  return handlers ,signIn etc as a obj
// handlers handle api route and signIn is use for login auth is a middleware use fo auth
// In a provider, we define method (as like google credentialse) how users log in
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials:{
        email:{label:"eamil",type:"email"},
        password:{label:"Password",type:"password"}
      },
      //in authorize we define the login logic
       async authorize(credentials,request){
        try{
           await connectDb();
           const email= credentials.email
           const password=credentials.password as string
           const user=await User.findOne({email})
           if(!user){
            throw new Error("user does not exist");
           }
           const isMatch=await bcrypt.compare(password,user.password)
           if(!isMatch){
            throw new Error("Incorrect Password");
           }
           return{
            id:user._id.toString(),
            name:user.name,
            email:user.email,
            role:user.role
           }
        }
        catch (error) {
          console.error("Authorize Error:", error);
           return null;
      }
      }
    })
  ],
  //by the callback we insert user data in token on the basis of this data matching is performed 
  callbacks:{
     jwt({token,user}){
        if(user){
          token.id=user.id,
          token.name=user.name,
          token.role=user.role
      }
      return token
      //by this the detail is show in cokkies
    },
    //but every one is use session for login so we insert data in session and this data is come from token
    session({session,token}){
      if(session.user){
        session.user.id=token.id as string,
         session.user.name=token.name as string,
          session.user.email=token.email as string,
           session.user.role=token.role as string
      }
      return session
    }
  },
  //In page obj we tell in which page the user go when the error is come and other things 
   pages:{
    signIn:"/login",
    error:"/login"
   },
   session:{
    strategy:"jwt", // by this we tell from which we take the session
    maxAge:10*24*60*60*1000 //(10 days)
   },
   secret:process.env.AUTH_SECRET
})