const express = require('express')
const userRouter=express.Router();
const userModel=require('../models/userModel');
const protectRoute=require('./authHelper');

userRouter
.route('/')
.get(getUsers)
.post(postUser)
.patch(updateUser)
.delete(deleteUser)

userRouter.route('/getCookies')
.get(getCookies);

userRouter.route('/setCookies')
.get(setCookies);

userRouter
.route('/:id')
.get(getUserbyId)


async function getUsers(req,res){
    let users= await userModel.find();
    res.json({
        message:'list of all users',
        data:users
    });
}

function postUser(req, res){
    console.log(req.body);
    users=req.body;
    res.json({
        message:"data recieved",
        user:req.body
    })
}

async function updateUser (req,res){
    console.log('req.body-->', req.body);
    let dataTobeUpdated=req.body;
    let users=await userModel.findOneAndUpdate({
        email:'abc@gmail.com'
    },dataTobeUpdated)
    //for(key in req.body){
      //  user[key]=dataTobeUpdated[key];
    //}
    res.json({
        message:"data updated"
    })
}
 
async function deleteUser(req,res){
    //users={};
    let user=await userModel.findOneAndDelete({email:'abc@gmail.com'})
    res.json({
        message:"data deleted"
    })
}

function getUserbyId(req, res){
    console.log(req.params.id);
    res.send(" user id recieved");
    
}
function setCookies(req,res){
    // res.setHeader('Set-Cookie', 'isLoggedIn=true');
    res.cookie('isLoggedIn', true, {maxAge:1000*60*60*24, secure:true, httpOnly:true});
    res.send('cookies has been sent');
}

function getCookies(req,res){
   let cookies=req.cookies;
   console.log(cookies);
   res.send("cookies recieved");

}

// let flag=true;




module.exports=userRouter;