const express = require('express')
const userRouter=express.Router();
const {getUsers, postUser, updateUser, deleteUser, getUserbyId}=require('../controller/userController');
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




// let flag=true;




module.exports=userRouter;