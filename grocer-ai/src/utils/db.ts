import mongoose from "mongoose";
 const MongoConectionString=process.env.DB_CONNECTION_STRING 
 if(!MongoConectionString){
  throw new Error ("Coneection String Not Found");
 }

 let cached=global.mongoose;
 