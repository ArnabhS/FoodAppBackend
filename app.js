const express = require('express')
const app = express()
const cookieParser=require('cookie-parser');

app.use(express.json());
app.listen(3000)
app.use(cookieParser());

const userRouter=require('./routers/userRouter');
// const authRouter=require('./routers/authRouter');
//mini app

app.use('/user', userRouter);
// app.use('/auth', authRouter);
// base route

const planModel=require('./models/planModel');





