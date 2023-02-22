import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();


// Mongoose Connection
mongoose.set("strictQuery", false);

mongoose
.connect(process.env.MONGO_URI)
.then(() =>{
    console.log("MongoDB Connected");
})
.catch((err) =>{
    console.log(err); 
})

// Creation of the server
const PORT = 1000
app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server Is Runnning on Port ${process.env.PORT || PORT}`);
})