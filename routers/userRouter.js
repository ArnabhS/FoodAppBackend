
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


userRouter.use(protectRoute);
userRouter.route('/userProfile')
  .get(getUser);


userRouter.use(isAuthorised(['admin']));
userRouter.route('/')
  .get(getAllUser);

module.exports = userRouter;
