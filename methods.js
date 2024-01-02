const express = require('express')
const app = express()

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
.get(getSignUp)
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

function getSignUp(req, res){
    res.sendFile('/public/index.html',{root:__dirname})
}

function postSignUp(req, res){
    let obj=req.body;
    res.json({
        message:"user signed up",
        data:obj
    })
}