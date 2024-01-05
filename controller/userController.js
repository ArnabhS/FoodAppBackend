
const userModel=require('../models/userModel');


module.exports.getUser=async function getUser(req,res){
    try{

   
    let id=req.params.id;
    let user= await userModel.findById(id);
    if(user){
    res.json(user);
}
    else{
        return res.json({
            message:"user not found"
        })
    }
}
catch(err){
  res.json({
    message:err.message
  })
}
}

// module.exports.postUsers=function postUser(req, res){
//     console.log(req.body);
//     users=req.body;
//     res.json({
//         message:"data recieved",
//         user:req.body
//     })
// }

module.exports.udpateUser=async function updateUser(req,res){
    // console.log('req.body-->', req.body);

    try{
    let id=req.params.id;
    let user= await userModel.findById(id);
    let dataTobeUpdated=req.body;
    if(user){
        const keys=[];
        for(let key in dataTobeUpdated){
            keys.push(key);
        }

        for(let i=0;i<keys.length;i++){
            user[keys[i]]=dataTobeUpdated[keys[i]];
        }
        const updatedData=await user.save();
        res.json({
            message:"data updated",
            data:user
        })
    }
    else{
        res.json({
            message:"user not found"
        })
    }
}
catch(err){
    console.log(err);
    }
}
    
 
module.exports.deleteUser=async function deleteUser(req,res){
    //users={};
    try{
    let id=req.params.id;
    let user=await userModel.findByIdAndDelete(id);
    if(!user){
        res.json({
            message:"user not found"
        })
    }
    res.json({
        message:"data deleted"
    })
}
catch(err){
    res.json({
        message:err.message
    })
}
}

module.exports.getAllUser=async function getAllUser(req, res){
    try{
   let users=await userModel.find();
   if(users){
    res.json({
        message:'users retrieved',
        data:users
    });
   }
}
  catch(err){
    res.json({
        message:err.message
    })
  }
    
}
