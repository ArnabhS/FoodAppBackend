const express = require('express')
const userRouter=express.Router();
const {getUser,updateUser, deleteUser, getAllUser}=require('../controller/userController');
// const protectRoute=require('./authHelper');
const{signup,login,isAuthorised,protectRoute}=require('../controller/authController')

//user options
userRouter.route('/:id')
.patch(updateUser)
.delete(deleteUser)


userRouter
.route('/signup')
.post(signup)

userRouter
.route('/login')
.post(login)


//profile page
userRouter.use(protectRoute)
userRouter
.route('/userProfile')
.get(getUser)





//admin specific work
userRouter.use(isAuthorised(['admin']))
userRouter
.route('/')
.get(getAllUser)



// let flag=true;
module.exports=userRouter;