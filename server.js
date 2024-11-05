const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

let messages = [];

io.on('connection', (socket) => {
	console.log(`Usuário ${socket.id} conectado`);

	if(messages.length > 0){
		socket.emit('fetch messages', messages);
	}
	
	socket.on('chat message', (message) => {
		io.emit('chat message', message);
		messages.push(message);
	});
	
	socket.on('disconnect', () => {
		console.log(`Usuário ${socket.id} desconectado`);
	});
});

server.listen(3000, () => {
	console.log('Servidor rodando em http://localhost:3000');
});