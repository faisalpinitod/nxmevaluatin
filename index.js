const express=require("express")
const { connection } = require("./config/db")
const cors=require("cors")
const {userRouter}=require("./Router/user.router")
const {postRouter}=require("./Router/post.router")
const {auth}=require("./middleware/authenticate.middleware")
require("dotenv").config()

const app=express()
app.use(cors())
app.use(express.json())
app.get("/",async(req,res)=>{
    res.send("Home Page")
})
app.use("/users",userRouter)
app.use(auth)
app.use("/posts",postRouter)

app.listen(process.env.port,async()=>{
    try{
        await connection
        console.log("DB is connected")
    }catch(err){
        console.log(err)
        console.log({"msg":"DB is not connected"})
    }
    console.log("The server is running at 8080")
})