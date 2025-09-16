const http = require('http');
const fs = require('fs');
const mysql = require('mysql2');
const qstring = require('querystring');
const crypto = require('crypto');
const path = require('path');
// const loadpages = require('./loadpages');
require('dotenv').config(); 
//  the dotenv intalled function reads/ parse the (key/value) pair data from the .env file and serve it to the process.env from where it can be fetched.


const connection = mysql.createConnection({
      host:process.env.DB_HOST,
      user:process.env.DB_USER,
      password:process.env.DB_PASS,
      database:process.env.DB_DBASE
});

connection.connect(function(err){
    if(err){
        console.log('connection failed' + err.message);
    }
    else{
        console.log('connected successfully');
    }
});






function HomePage(res, filepath, content_type){
  fs.readFile(filepath, "utf-8", function(err,page){
            if(err){
                res.writeHead(500, {'Content-Type':'text/plain'});
                    res.end("error loading page" + err.message);
                   }
            else{
                res.writeHead(200, {'Content-Type':content_type});
                res.end(page);
                }
       });
}



function SecondaryPages(req,res){
const base = path.resolve(__dirname); 
// const base = path.resolve(__dirname, 'public');      //  all public assets files
const filePath = path.resolve(base, req.url.replace(/^\/+/, ''));
if (!filePath.startsWith(base)) return res.end('Access denied');

  const ext = path.extname(filePath);
   const mimeType = {
        ".htm":"text/html",
        ".html":"text/html",
        ".css":"text/css",
        ".js":"application/javascript",
        ".png":"image/png",
        ".jpg":"image/jpg",
        ".jpeg":"image/jpeg"
         }
   const contentType = mimeType[ext] || "application/octet-stream";

        fs.readFile(filePath,function(err,page){
        if(err){
            res.writeHead(500,{'Content-Type':'text/plain'});
            res.end("error loading file" + err.message);
              }
        else{
            res.writeHead(200, {'Content-Type':contentType});
            res.end(page);
            }
    });

}


http.createServer(function(req,res){
    if(req.url==="/" && req.method==="GET"){
        HomePage(res,"./public/html&css/homepage.htm","text/html");
    }
    else if(req.method==="GET"){
        SecondaryPages(req,res);
    } 

}).listen(8080);