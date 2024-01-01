const express = require('express')
const app = express()

app.use(express.json());
app.listen(3000)

let users={};
app.get('/users', (req,res)=>{
    res.send(users);
})

app.post('/users', (req, res)=>{
    console.log(req.body);
    users=req.body;
    res.json({
        message:"data recieved",
        user:req.body
    })
})


// update --> patch
app.patch('/user', (req,res)=>{
    console.log('req.body-->', req.body);
    let dataTobeUpdated=req.body;
    for(key in req.body){
        user[key]=dataTobeUpdated[key];
    }
    res.json({
        message:"data updated"
    })
});

app.delete('/user', (req,res)=>{
    users={};
    res.json({
        message:"data deleted"
    })
})