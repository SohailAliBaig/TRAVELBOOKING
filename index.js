const http =require("http");
const fs=require("fs");
const path =require("path");
const { url } = require("inspector");
const { URLSearchParams } = require("url");
const port=8222;




const filePath= path.join(__dirname,"index.html");
const filePathlog= path.join(__dirname,"login.html");
const filePathregi= path.join(__dirname,"register.html");
const filePathser= path.join(__dirname,"book.html");
const filePathsub= path.join(__dirname,"submit.html");




const api=http.createServer((req,res)=>{
    if(req.url==="/"){
       fs.readFile(filePath,"utf8",(err,data)=>{
        if(err)
        {
            console.log(err);

        } else{
            res.end(data);
        }
    })
    } else if(req.url==="/login" || req.url==="/login.html"){
        fs.readFile(filePathlog,"utf8",(err,data)=>{
            if(err)
            {
                console.log(err);
    
            } else{
                res.end(data);
            }
        })
    }
    else if(req.url==="/search"){
        fs.readFile(filePathser,"utf8",(err,data)=>{
            if(err)
            {
                console.log(err);
    
            } else{
                res.end(data);
            }
        })
    }
    else if(req.url==="/register/submit" && req.method==="POST"){
        let body='';
        req.on("data",function(chunk){
            body=body+chunk.toString();
        })
        req.on("end", ()=>{
            const newData = new URLSearchParams(body)
            const first_name=newData.get("fullname")
            console.log(newData)
            console.log(first_name)
        })
        fs.readFile(filePathsub,"utf8",(err,data)=>{
            if(err)
            {
                console.log(err);
    
            } else{
                res.end(data);
            }
        })
    }
    else if(req.url==="/regist.html" || req.url==="/registeration"){
        fs.readFile(filePathregi,"utf8",(err,data)=>{
            if(err)
            {
                console.log(err);
    
            } else{
                res.end(data);
            }
        })
    }
    else{
        res.end("pagenotfound");
    }
})




api.listen(port,function(){
 console.log("server succesfull");
 })