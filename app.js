const express = require('express')
const app = express()
const mongoose=require('mongoose');
app.use(express.json());
app.listen(3000)

let users=[
    {
        id:1,
        name:"Arnabh",
    },
    {
        id:2,
        name:"Abhisek",
    },
    {
        id:3,
        name:"Russ",
    },
];

//mini app
const userRouter=express.Router();
const authRouter=express.Router();

app.use('/users', userRouter);
app.use('/auth', authRouter);
// base route
userRouter
.route('/')
.get(getUser)
.post(postUser)
.patch(updateUser)
.delete(deleteUser)

userRouter
.route('/:id')
.get(getUserbyId)

authRouter
.route('/signup')
.get(middleware1,getSignUp, middleware2)
.post(postSignUp)



function getUser(req,res){
    
    res.send(users);
}

function postUser(req, res){
    console.log(req.body);
    users=req.body;
    res.json({
        message:"data recieved",
        user:req.body
    })
}

function updateUser (req,res){
    console.log('req.body-->', req.body);
    let dataTobeUpdated=req.body;
    for(key in req.body){
        user[key]=dataTobeUpdated[key];
    }
    res.json({
        message:"data updated"
    })
}
 
function deleteUser(req,res){
    users={};
    res.json({
        message:"data deleted"
    })
}

function getUserbyId(req, res){
    console.log(req.params.id);
    res.send(" user id recieved");
    
}

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

function postSignUp(req, res){
    let obj=req.body;
    res.json({
        message:"user signed up",
        data:obj
    })
}
const db_link='mongodb+srv://sinhaarnabh888:Arnabh_0205@cluster0.gqobuxc.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(db_link)
.then(function (db){
    //console.log(db);
    console.log("data base connected");
})
.catch(function(err){
    console.log(err);
})

const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    confirmPassword:{
        type:String,
        required:true,
        minLength:8
    }

})

//model
const userModel=mongoose.model('userModel',userSchema);

(async function createUser(){
    let user={
        name:'Arnabh',
        email:'abc@gmail.com',
        password:'12345678',
        confirmPassword:'12345678'
    };
    let data=await userModel.create(user);
    console.log(data);
})();

