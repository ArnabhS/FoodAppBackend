const express = require('express')
const app = express()

app.use(express.json());
app.listen(3000)

let users={};
app.get('/users', (req,res)=>{
    console.log(req.query);
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
app.patch('/users', (req,res)=>{
    console.log('req.body-->', req.body);
    let dataTobeUpdated=req.body;
    for(key in req.body){
        user[key]=dataTobeUpdated[key];
    }
    res.json({
        message:"data updated"
    })
});

app.delete('/users', (req,res)=>{
    users={};
    res.json({
        message:"data deleted"
    })
})

// parameters

app.get('/users/:id', (req, res)=>{
    console.log(req.params.id);
    res.send(" user id recieved");
    
})