const express = require('express')
const app = express()
const mongoose=require('mongoose');
app.use(express.json());
app.listen(3000)



//mini app
const userRouter=express.Router();
const authRouter=express.Router();

app.use('/users', userRouter);
app.use('/auth', authRouter);
// base route
userRouter
.route('/')
.get(getUsers)
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



async function getUsers(req,res){
    let users= await userModel.findOne({name:Arnabh})
    res.json({
        message:'list of all users',
        data:allUSers
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

//(async function createUser(){
    //let user={
      //  name:'Arnabh',
       // email:'abc@gmail.com',
       // password:'12345678',
       // confirmPassword:'12345678'
   // };
    //let data=await userModel.create(user);
    //console.log(data);
//})();

