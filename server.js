const http = require('http');
const fs = require('fs');
const path= require('path');

http.createServer(function(req,res){

	var filepath = req.url;
	var ext = path.extname(filepath);

	var dir = {
		'.htm': 'html',
		'.html': 'html',
		'.css': 'css',
		'.js': 'js',
		'.jpg': 'assets',
		'.jpeg': 'assets',
		'.png': 'assets'
	}

	filepath = path.join(__dirname, 'public', dir[ext] || '', req.url);
	
	var mimeType = {
		".htm" : "text/html",
		".html": "text/html",
		".css": "text/css",
		".js": "text/javascript"
	}
	var contentType = mimeType[ext] || "application/octet-stream";

	fs.readFile(filepath, "utf-8", function(err, data) {
		if(err) {
			res.writeHead(500, {'Content-Type':'text/plain'});
			res.end(`Error loading page ${err.message}`);
		}
		else {
		res.writeHead(200, {'Content-Type':contentType});
		res.end(data);
		}
	});
	
}).listen(8080);
