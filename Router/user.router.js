const express=require("express")
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
const {UserModel}=require("../model/user.model")



const userRouter=express.Router()

userRouter.use(express.json())

userRouter.post("/register",async(req,res)=>{
    const {name,email,gender,password}=req.body
    try{
        bcrypt.hash(password,5,async(err,hash)=>{
            if(err){
                console.log(err)
            }else{
                const user=new UserModel({name,email,gender,password:hash})
                await user.save()
                console.log(user)
                res.send("Registerd")
            }
        })
    }catch(err){
        console.log(err)
        res.send({"msg:":"something went wrong"})
    }
})


userRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(password,user[0].password,async(err,result)=>{
                if(result){
                    const token =jwt.sign({userID:user[0]._id},"masai")
                    res.send({"msg":"Login success","token":token})
                }else{
                    res.send("Wrong crediantials")
                }
            })
        }else{
            res.send("Wrong crediantials")
        }
    }catch(err){
        console.log(err)
        res.send({"msg:":"something went wrong"})
    }
})

module.exports={
    userRouter
}