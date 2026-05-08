const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

let users = {}; 

io.on('connection', (socket) => {
    // 1. Khi người dùng tham gia
    socket.on('join', (username) => {
        users[socket.id] = username;
        io.emit('updateUserList', Object.values(users));
    });

    // 2. Xử lý gửi tin nhắn riêng + Kèm thời gian
    socket.on('privateMessage', (data) => {
        const targetId = Object.keys(users).find(id => users[id] === data.to);
        if (targetId) {
            io.to(targetId).emit('receiveMessage', {
                sender: users[socket.id],
                message: data.message,
                time: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
            });
        }
    });

    // 3. Xử lý khi đang soạn tin
    socket.on('typing', (data) => {
        const targetId = Object.keys(users).find(id => users[id] === data.to);
        if (targetId) {
            socket.to(targetId).emit('isTyping', { from: users[socket.id] });
        }
    });

    // 4. Khi người dùng thoát
    socket.on('disconnect', () => {
        delete users[socket.id];
        io.emit('updateUserList', Object.values(users));
    });
}); // <--- DẤU ĐÓNG NÀY RẤT QUAN TRỌNG

const PORT = 3000;
server.listen(PORT, () => {
    console.log('====================================');
    console.log('   MOTO GO SYSTEM IS READY!        ');
    console.log(`   Link: http://localhost:${PORT}   `);
    console.log('====================================');
});