const socket = io();
let myName = '', targetId = '', typingTimeout;
let chatHistory = {}; 

// 1. ĐĂNG NHẬP & QUYỀN THÔNG BÁO
function joinChat() {
    const input = document.getElementById('username');
    if (input.value.trim()) {
        myName = input.value.trim();
        socket.emit('join', myName);
        document.getElementById('my-name').innerText = myName;
        document.getElementById('login-container').classList.add('hidden');
        document.getElementById('chat-container').classList.remove('hidden');
        
        if ("Notification" in window) {
            Notification.requestPermission();
        }
    }
}

// --- TÍNH NĂNG MỚI: THÊM BẠN BÈ ---
function addNewUser() {
    const friendName = prompt("Nhập tên người bạn muốn thêm vào danh sách:");
    if (friendName) {
        alert("Đã gửi lời mời đến " + friendName + " (Tính năng cần Database để hoạt động thực tế)");
    }
}

// --- TÍNH NĂNG MỚI: RỜI ĐOẠN CHAT ---
function leaveChat() {
    if (!targetId) {
        alert("Bạn chưa chọn đoạn chat nào để rời!");
        return;
    }

    const confirmLeave = confirm("Bạn có chắc muốn rời đoạn chat này? Lịch sử chat của người này sẽ bị xóa.");
    
    if (confirmLeave) {
        // 1. Xóa lịch sử trong bộ nhớ tạm chatHistory
        delete chatHistory[targetId];
        
        // 2. Reset giao diện về trạng thái ban đầu
        targetId = '';
        document.getElementById('target-name').innerText = "Chọn một người để bắt đầu";
        document.getElementById('messages-box').innerHTML = '';
        document.getElementById('typing-status').innerText = '';
        
        // 3. Bỏ đánh dấu active ở danh sách bên trái
        document.querySelectorAll('#user-list li').forEach(li => li.classList.remove('active'));
        
        alert("Đã rời đoạn chat và xóa lịch sử tạm thời.");
    }
}

// 2. CẬP NHẬT DANH SÁCH NGƯỜI DÙNG
socket.on('updateUserList', (users) => {
    const list = document.getElementById('user-list');
    const others = users.filter(u => u && u.name && u.name !== myName);
    list.innerHTML = others.map(u => `
        <li id="u-${u.id}" onclick="selectUser('${u.id}', '${u.name}')">
            <i class="fas fa-circle" style="color:#2ecc71; font-size:8px;"></i> ${u.name}
        </li>
    `).join('');
});

// 3. CHỌN NGƯỜI CHAT & NẠP LẠI LỊCH SỬ
function selectUser(id, name) {
    if (targetId === id) return; 
    targetId = id;
    
    document.getElementById('target-name').innerText = "Đang chat với: " + name;
    const box = document.getElementById('messages-box');
    box.innerHTML = ''; 

    if (chatHistory[id]) {
        chatHistory[id].forEach(m => {
            renderSingleMsg(m.side, m.content, m.type, m.time, m.msgId, m.fileName);
        });
    }

    document.querySelectorAll('#user-list li').forEach(li => li.classList.remove('active'));
    if(document.getElementById(`u-${id}`)) document.getElementById(`u-${id}`).classList.add('active');
}

// 4. HÀM VẼ TIN NHẮN LÊN MÀN HÌNH
function renderSingleMsg(side, content, type, time, msgId, fileName = 'Tệp tin') {
    const box = document.getElementById('messages-box');
    const div = document.createElement('div');
    div.className = `msg ${side}`; div.id = msgId;
    
    let body = content;
    if (type === 'image') {
        body = `<img src="${content}" style="max-width:200px; border-radius:10px; cursor:pointer;" onclick="window.open(this.src)">`;
    } else if (type === 'file') {
        body = `<div style="display:flex; align-items:center; background:rgba(0,0,0,0.1); padding:10px; border-radius:8px;">
                    <i class="fa-solid fa-file-arrow-down fa-2x"></i>
                    <div style="margin-left:10px; font-size:12px;">
                        <a href="${content}" download="${fileName}" style="color:inherit; text-decoration:none;">
                            <b>${fileName}</b><br>Nhấn để tải về
                        </a>
                    </div>
                </div>`;
    } else if (type === 'location') {
        body = `<a href="${content}" target="_blank" style="color:inherit; text-decoration:underline;">📍 Xem vị trí trên bản đồ</a>`;
    }
    
    const unsendBtn = side === 'sent' ? `<i class="fa-solid fa-rotate-left unsend-btn" title="Thu hồi" onclick="unsend('${msgId}')"></i>` : '';
    
    div.innerHTML = `${body} ${unsendBtn} <br><span style="font-size:10px; opacity:0.6">${time}</span>`;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
}

// 5. HÀM LƯU VÀO LỊCH SỬ & GỌI VẼ
function appendMsg(side, content, type, time, msgId, fileName) {
    if (!chatHistory[targetId]) chatHistory[targetId] = [];
    chatHistory[targetId].push({ side, content, type, time, msgId, fileName });
    renderSingleMsg(side, content, type, time, msgId, fileName);
}

// 6. GỬI TIN NHẮN VĂN BẢN
function sendMessage() {
    const input = document.getElementById('msg-input');
    if (input.value.trim() && targetId) {
        const msgId = 'm-' + Date.now();
        socket.emit('privateMessage', { toId: targetId, msg: input.value, type: 'text', sender: myName, msgId });
        appendMsg('sent', input.value, 'text', 'Vừa xong', msgId);
        input.value = '';
        socket.emit('typing', { toId: targetId, isTyping: false });
    }
}

// 7. GỬI TỆP
function sendFile(input) {
    if (input.files[0] && targetId) {
        const file = input.files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            const msgId = 'f-' + Date.now();
            const fileType = file.type.startsWith('image/') ? 'image' : 'file';
            socket.emit('privateMessage', { 
                toId: targetId, msg: e.target.result, type: fileType, 
                sender: myName, msgId: msgId, fileName: file.name 
            });
            appendMsg('sent', e.target.result, fileType, 'Vừa xong', msgId, file.name);
        };
        reader.readAsDataURL(file);
        input.value = ''; 
    }
}

// 8. THU HỒI TIN NHẮN
function unsend(msgId) {
    if (confirm("Bạn muốn thu hồi tin nhắn này?")) {
        socket.emit('deleteMessage', { toId: targetId, msgId: msgId });
        const el = document.getElementById(msgId);
        if (el) el.innerHTML = "<i style='opacity:0.5'>Bạn đã thu hồi tin nhắn</i>";
        
        if (chatHistory[targetId]) {
            let msg = chatHistory[targetId].find(m => m.msgId === msgId);
            if (msg) msg.content = "Bạn đã thu hồi tin nhắn";
        }
    }
}

socket.on('removeMessageFromUI', ({ msgId }) => {
    const el = document.getElementById(msgId);
    if (el) el.innerHTML = "<i style='opacity:0.5'>Tin nhắn đã được thu hồi</i>";
});

// 9. GỬI VỊ TRÍ
function sendLocation() {
    if (!targetId) return;
    navigator.geolocation.getCurrentPosition((p) => {
        const url = `https://www.google.com/maps?q=${p.coords.latitude},${p.coords.longitude}`;
        const msgId = 'l-' + Date.now();
        socket.emit('privateMessage', { toId: targetId, msg: url, type: 'location', sender: myName, msgId });
        appendMsg('sent', url, 'location', 'Vừa xong', msgId);
    }, () => alert("Không thể lấy vị trí"), { timeout: 10000 });
}

// 10. TRẠNG THÁI ĐANG SOẠN TIN
function handleTyping() {
    socket.emit('typing', { toId: targetId, isTyping: true });
    clearTimeout(typingTimeout);
    typingTimeout = setTimeout(() => socket.emit('typing', { toId: targetId, isTyping: false }), 2000);
}

socket.on('displayTyping', (data) => {
    document.getElementById('typing-status').innerText = data.isTyping ? "Đối phương đang soạn tin..." : "";
});

// 11. NHẬN TIN NHẮN & THÔNG BÁO
socket.on('receiveMessage', (data) => {
    appendMsg('received', data.msg, data.type, data.time, data.msgId, data.fileName);
    new Audio('https://raw.githubusercontent.com/sh4n1/Zalo-Clone/master/public/sounds/notification.mp3').play().catch(()=>{});

    if (Notification.permission === "granted" && document.hidden) {
        new Notification(`Từ ${data.sender}`, { 
            body: data.type === 'text' ? data.msg : "Đã gửi một tệp đính kèm",
            icon: 'https://cdn-icons-png.flaticon.com/512/733/733585.png'
        });
    }
});

// 12. EMOJI
function toggleEmoji() { document.getElementById('custom-emoji-picker').classList.toggle('hidden'); }
function addEmoji(e) { 
    const input = document.getElementById('msg-input');
    input.value += e; 
    input.focus();
    toggleEmoji(); 
}