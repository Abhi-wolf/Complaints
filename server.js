const express=require("express");
const app=express();

//dotenv configuration:
const dotenv=require("dotenv");
dotenv.config();

//connection database:
const connectDb = require("./db/config");
connectDb();

//middlewares:
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use("/api/v1/user",require("./route/userRoutes"))

app.listen(process.env.PORT,()=>{
    console.log("server is listening");
})