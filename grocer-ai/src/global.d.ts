import { Connection } from "mongoose"

declare global{
    var mongoose:{
        conn:Connection | null,
        promise:Promise<Connection> | null; //here we tell that the connection promise 
    }
}
export {};