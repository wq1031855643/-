const express = require('express');

const server = express();

server.use('/css', express.static('./dist/css'));
server.use('/js', express.static('./dist/js'));
server.use('/images', express.static('./dist/images'));
server.use('/data', express.static('./dist/data'));

server.get('/', (req, res)=>{
	res.sendFile(__dirname + '/dist/index.html');
})

server.get('/posi', (req, res)=>{
	res.sendFile(__dirname + '/dist/posi.html');
})

server.get('/JobMessage', (req, res)=>{
	res.sendFile(__dirname + '/dist/JobMessage.html');
})

server.get('/comdetails', (req, res)=>{
	res.sendFile(__dirname + '/dist/comdetails.html');
})

server.get('/company', (req, res)=>{
	res.sendFile(__dirname + '/dist/company.html');
})

server.get('/app', (req, res)=>{
	res.sendFile(__dirname + '/dist/app.html');
})

server.get('/message', (req, res)=>{
	res.sendFile(__dirname + '/dist/message.html');
})

server.get('/login', (req, res)=>{
	res.sendFile(__dirname + '/dist/login.html');
})

server.get('/resume', (req, res)=>{
	res.sendFile(__dirname + '/dist/resume.html');
})
//启动服务
server.listen(80,(error)=>{
	if (error) {
		console.log("启动失败");
	}else{
		console.log("启动成功");
	}
})