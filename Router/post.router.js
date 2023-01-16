
const express=require("express")
const {PostModel}=require("../model/post.model")

const postRouter=express.Router()

postRouter.use(express.json())

postRouter.post("/",async(req,res)=>{
    const data=req.body
    try{
        const post=new PostModel(data)
        await post.save()
        console.log(post)
        res.send("The data is posted")
    }catch(err){
        console.log(err)
        res.send({"msg:":"something went wrong"})
    }
})

postRouter.get("/",async(req,res)=>{
    const data=req.query
    try{
        const post=await PostModel.find(data)
        console.log(post)
        res.send(post)
    }catch(err){
        console.log(err)
        res.send({"msg:":"something went wrong"})
    }
})




module.exports={
    postRouter
}