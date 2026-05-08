const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { 
    maxHttpBufferSize: 1e7 // Cho phép gửi file (ảnh) lên đến 10MB
});

app.use(express.static(__dirname + '/public'));

const users = new Map();

io.on('connection', (socket) => {
    // Đăng nhập
    socket.on('join', (name) => {
        users.set(socket.id, { id: socket.id, name: name });
        io.emit('updateUserList', Array.from(users.values()));
    });

    // Gửi tin nhắn (Văn bản, Ảnh, Vị trí)
    socket.on('privateMessage', (data) => {
        socket.to(data.toId).emit('receiveMessage', {
            ...data,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
    });

    // Thu hồi tin nhắn
    socket.on('deleteMessage', (data) => {
        socket.to(data.toId).emit('removeMessageFromUI', { msgId: data.msgId });
    });

    // Trạng thái đang soạn tin
    socket.on('typing', (data) => {
        socket.to(data.toId).emit('displayTyping', { isTyping: data.isTyping });
    });

    socket.on('disconnect', () => {
        users.delete(socket.id);
        io.emit('updateUserList', Array.from(users.values()));
    });
});

server.listen(3000, () => console.log('Zalo Gold đang chạy tại http://localhost:3000'));