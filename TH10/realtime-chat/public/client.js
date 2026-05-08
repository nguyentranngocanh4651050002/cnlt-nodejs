const socket = io();
let myName = "";
let selectedUser = "";
let typingTimeout;

// 1. Tham gia hệ thống
function joinSystem() {
    myName = document.getElementById('username').value;
    if (myName) {
        socket.emit('join', myName);
        document.getElementById('login-screen').style.display = 'none';
        document.getElementById('main-app').style.display = 'flex';
    }
}

// 2. Cập nhật danh sách người dùng online
socket.on('updateUserList', (users) => {
    const list = document.getElementById('user-list');
    list.innerHTML = users
        .filter(name => name !== myName)
        .map(name => `<li onclick="selectTarget('${name}')">🛵 ${name}</li>`)
        .join('');
});

// 3. Chọn người để chat
function selectTarget(name) {
    selectedUser = name;
    document.getElementById('chat-with').innerText = "Đang hỗ trợ thuê xe cho: " + name;
    document.getElementById('messages').innerHTML = ""; // Xóa lịch sử khi đổi người
}

// 4. Gửi tin nhắn
function sendMessage() {
    const msgInput = document.getElementById('msg-input');
    const msg = msgInput.value;
    const now = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });
    
    if (selectedUser && msg) {
        socket.emit('privateMessage', { to: selectedUser, message: msg });
        appendMessage(`Bạn: ${msg}`, 'msg-sent', now); 
        msgInput.value = "";
    } else if (!selectedUser) {
        alert("Vui lòng chọn một người từ danh sách online!");
    }
}

// 5. Nhận tin nhắn từ người khác
socket.on('receiveMessage', (data) => {
    if (data.sender === selectedUser) {
        appendMessage(`${data.sender}: ${data.message}`, 'msg-received', data.time);
    } else {
        alert(`Bạn có tin nhắn mới từ ${data.sender}`);
    }
});

// 6. Hiển thị tin nhắn lên màn hình (Kèm giờ giấc)
function appendMessage(text, className, time) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `msg ${className}`;
    msgDiv.innerHTML = `
        <div class="text-content">${text}</div>
        <span class="msg-time">${time}</span>
    `;
    const container = document.getElementById('messages');
    container.appendChild(msgDiv);
    
    // Cuộn xuống mượt mà
    container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
}

// 7. Gửi tín hiệu "Đang soạn tin..." khi gõ phím
document.getElementById('msg-input').addEventListener('input', () => {
    if (selectedUser) {
        socket.emit('typing', { to: selectedUser, from: myName });
    }
});

// 8. Hiển thị hiệu ứng "Đang soạn tin..." nhận được
socket.on('isTyping', (data) => {
    if (data.from === selectedUser) {
        const headerStatus = document.getElementById('chat-with');
        const originalText = "Đang hỗ trợ thuê xe cho: " + selectedUser;
        
        headerStatus.innerHTML = `${data.from} đang soạn tin <span class="dots">...</span>`;
        
        clearTimeout(typingTimeout);
        typingTimeout = setTimeout(() => {
            headerStatus.innerText = originalText;
        }, 2000);
    }
});

// Lắng nghe phím Enter để gửi tin nhắn nhanh
document.getElementById('msg-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});