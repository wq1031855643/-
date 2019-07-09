const express = require('express');

const server = express();

server.use('/dist/css', express.static('./dist/css'));
server.use('/dist/js', express.static('./dist/js'));
server.use('/dist/images', express.static('./dist/images'));
server.use('/dist/data', express.static('./dist/data'));

server.get('/', (req, res)=>{
	res.sendFile(__dirname + '/dist/index.html');
})

server.get('/posi', (req, res)=>{
	res.sendFile(__dirname + '/dist/posi.html');
})
//启动服务
server.listen(80,(error)=>{
	if (error) {
		console.log("启动失败");
	}else{
		console.log("启动成功");
	}
})