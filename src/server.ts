import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";
const port = envVars.PORT;
let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(`${envVars.DB_URL}`);
    console.log("Server Connected to MongoDB!");
    server = app.listen(port, () => {
      console.log(`server running on ${port}`);
    });
  } catch (error) {
    console.log(error)
  }
};

startServer();

process.on("unhandledRejection", ()=>{
    console.log("Unhandled Rejection detected....Server Sutting down");

    if(server){
        server.close(()=>{
            process.exit(1);
        });
    };
    process.exit(1);
})

process.on("uncaughtExeption", ()=>{
    console.log("Uncaugt Rejection detected....Server Sutting down");

    if(server){
        server.close(()=>{
            process.exit(1);
        });
    };
    process.exit(1);
})