const express = require('express')
const userModel=require('../models/userModel');
const jwt=require('jsonwebtoken');
const JWT_KEY=require('./secrets')

//sign up
module.exports.signup=async function signup(req, res){
   try{
    let dataObj=req.body;
    let user=await userModel.create(dataObj)
    if(user){
    return res.json({
        message:"user signed up",
        data:user
    })
    }
    else{
        res.json({
            message:"error while siging up"
        })
    }
}
    catch(err){
        res.json({
            message:err.message
        })
    }
}

//log in user
module.exports.login=async function login(req, res){
    try{
    let data=req.body;
    if(data.email){
    let user= await userModel.findOne({email:data.email});
    if(user){
        //bcrypt -> compare
        if(user.password==data.password){

            let uid=user['_id'];
            let token=jwt.sign({payload:uid},JWT_KEY);

            res.cookie('login',token,{httpOnly:true});
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
        console.log(err);
    }
}

//isAuthorised-> to check the users role

module.exports.isAuthorised=function isAuthorised(roles)
{
    return function(req, res,next){
        if(roles.include(req.role)==true){
            next()
        }
        else{
            res.json({
                message:"operation not allowed"
            })
        }
    }
}

// protect route
module.exports.protectRoute=async function protectRoute(req, res, next){
    try{
    if(req.cookies.login){
        token=req.cookies.login;
        let payload=jwt.verify(token, JWT_KEY);
        if(payload){
       const user=await userModel.findById(payload);
       req.role=user.role;
       req.id=user.id;
       next();
        }
        else{
            return res.json({
                message:"user not verified"
            })
        }    
        }
        else{
            return res.json({
                message:"operation not allowed"
            })
        }
    }
    catch(err){
        res.json({
            message:err.message
        })
    }
    }