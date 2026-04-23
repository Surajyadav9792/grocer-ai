import mongoose from "mongoose";
 const MongoConectionString=process.env.DB_CONNECTION_STRING 
 if(!MongoConectionString){
  throw new Error ("Coneection String Not Found");
 }

 let cached=global.mongoose;
 //if in the cache the mongoose obj is not prsent then we mark or store null in  conn and promise variable which is define in global.d.ts 
 if(!cached){
    cached=global.mongoose={conn:null,promise:null}
 }
 const connectDb=async()=>{
    //if connection is present in the catch then return the connect 
    if(cached.conn){
        return cached.conn;
    }
    if(!cached.promise){
        cached.promise=mongoose.connect(MongoConectionString).then((conn)=>conn.connection) //  through mongoose.connect we got a string but we need a promise so  by .then((conn)=>conn.connection)  we get a promise which is go for resolve
    }
    // if not present then may be have promise and here we resolve the promise 
    try{
        const conn=await cached.promise
        return conn
    }
    catch(error){
        console.log(error);
    }

 }
 export default connectDb;