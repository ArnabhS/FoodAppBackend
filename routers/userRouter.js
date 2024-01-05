
const express = require('express');
const userRouter = express.Router();
const { getUser, updateUser, deleteUser, getAllUser } = require('../controller/userController');
const { signup, login, isAuthorised, protectRoute } = require('../controller/authController');


userRouter.route('/:id')
  .patch(updateUser)
  .delete(deleteUser);

userRouter.route('/signup')
  .post(signup);

userRouter.route('/login')
  .post(login);

userRouter
  .route('/forgetpassword')
  .post(forgetpassword);

userRouter
  .route('/resetpassword/:token')
  .post(resetpassword);


userRouter.use(protectRoute);
userRouter.route('/userProfile')
  .get(getUser);


userRouter.use(isAuthorised(['admin']));
userRouter.route('/')
  .get(getAllUser);

module.exports = userRouter;
