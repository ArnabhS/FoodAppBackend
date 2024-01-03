const express = require('express')
const userModel=require('../models/userModel');
const authRouter=express.Router();


authRouter
.route('/signup')
.get(middleware1,getSignUp, middleware2)
.post(postSignUp)

authRouter
.route('/login')
.post(loginUser);


function middleware1(req, res, next){
    console.log("middleware1 Encountered");
    next();
}
function middleware2(req, res){
    console.log("middleware2 Encountered");
    //next();
    
    res.sendFile('/public/index.html',{root:__dirname})
}

 function getSignUp(req, res, next){
    
    console.log("getsignup called");
    
    next();
}

async function postSignUp(req, res){
   
    let dataObj=req.body;
    let user=await userModel.create(dataObj)
    res.json({
        message:"user signed up",
        data:user
    })
}

async function loginUser(req, res){
    try{
    let data=req.body;
    if(data.email){
    let user= await userModel.findOne({email:data.email});
    if(user){
        //bcrypt -> compare
        if(user.password==data.password){
            return res.json({
                message: 'User logged in',
                userDetails:data
            })
        }
    }
    else{
        return res.json({
            message:"wrong credentials"
        })
    }
}
    else{
        return res.json({
            message:"please enter the email"
        })
    }
    }
    catch(err){
        return res.json({
            message:error.message
        })
    }
}


module.exports=authRouter;

