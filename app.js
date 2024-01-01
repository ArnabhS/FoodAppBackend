const express = require('express')
const app = express()

app.get('/', function (req, res) {
    res.sendFile('./views/index.html',{root:__dirname});
})

app.get('/about',(req,res)=>{
   res.sendFile('./views/about.html',{root:__dirname});
})

// redirects
app.get('/about-us', (req, res)=>{
    res.redirect('/about');
})

//404 page
app.use((req, res)=>{
    res.status.sendFile('./views/404.html',{root:__dirname});
})

app.listen(3000)