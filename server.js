const http=require('http');
const fs= require('fs');
const _=require('lodash');

const server=http.createServer((req,res)=>{
    console.log('request has been made from browser to server');
    let num=_.random(0,20);
    console.log(num);
   res.setHeader('Content-type', 'text/plain');
    let path='./views';
    switch(req.url){
        case '/':
            path+='/index.html';
            res.statusCode=200;
            break;
        case '/about':
            path+='/about.html';
            res.statusCode=200;
            break;
        case '/about-me':
           res.statusCode=301;
           res.setHeader('Location','/about');
            res.end()
            break;
        default:
            path+='404.html'; 
            res.statusCode=400;
            break;       
    }

   fs.readFile('./views/index.html',(err, fileData)=>{
    if(err)
    {
        console.log(err);
    }
    else{
        
        res.end(fileData);
    }
   })
});
server.listen(3000, 'localhost',()=>{
    console.log("server is listening on port 3000");
})