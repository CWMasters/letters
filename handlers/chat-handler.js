const registerChatHandler = (io, socket) => {
	socket.on('send-message', (message, room) => {
		if (room === '')
			socket.broadcast.emit('receive-message', message);
		else
			socket.to(room).emit('receive-message', message);
	});
	socket.on('join-room', (room, callback) => {
		socket.join(room);
		callback(`Joined ${room}`);
	});
}

module.exports = registerChatHandler;