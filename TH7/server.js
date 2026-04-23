const http = require('http');
const url = require('url');
const fs = require('fs');

const server = http.createServer((req, res) => {

    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;

    console.log("Request:", path);

    // ===== CSS =====
    if (path === '/style.css') {
        fs.readFile('./views/style.css', (err, data) => {
            if (err) {
                res.writeHead(404);
                return res.end('CSS not found');
            }
            res.writeHead(200, {'Content-Type': 'text/css'});
            res.end(data);
        });
        return;
    }

    // ===== IMAGE =====
    if (path.startsWith('/image/')) {
        fs.readFile('.' + path, (err, data) => {
            if (err) {
                res.writeHead(404);
                return res.end('Image not found');
            }

            let contentType = 'image/jpeg';
            if (path.endsWith('.png')) contentType = 'image/png';
            if (path.endsWith('.webp')) contentType = 'image/webp';

            res.writeHead(200, {'Content-Type': contentType});
            res.end(data);
        });
        return;
    }

    // ===== SEARCH (URL MODULE) =====
    if (path === '/search') {
        const animal = parsedUrl.query.animal || 'none';
        const color = parsedUrl.query.color || 'none';

        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});

        res.write(`
            <meta charset="UTF-8">
            <h1>Kết quả tìm kiếm</h1>
            <p>Animal: ${animal}</p>
            <p>Color: ${color}</p>
            <br>
            <a href="/">⬅ Quay về trang chủ</a>
        `);

        return res.end();
    }

    // ===== FS: CREATE FILE =====
    if (path === '/create-file') {

    const content = `File được tạo bằng NodeJS
Thời gian: ${new Date().toLocaleString()}
Demo FS module`;

    fs.writeFile('./files/test.txt', content, (err) => {
        if (err) {
            console.log(err);
            res.writeHead(500, {'Content-Type': 'text/html; charset=utf-8'});
            return res.end('❌ Lỗi tạo file');
        }

        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end('✅ Đã tạo file test.txt - mở thư mục files để xem');
    });

    return;
}

    // ===== FS: APPEND FILE =====
    if (path === '/append-file') {
        fs.appendFile('./files/test.txt', '\nThêm dòng mới', (err) => {
            if (err) {
                res.writeHead(500);
                return res.end('Lỗi ghi file');
            }
            res.end('✅ Đã thêm nội dung');
        });
        return;
    }

    // ===== FS: RENAME FILE =====
    if (path === '/rename-file') {
        fs.rename('./files/test.txt', './files/new.txt', (err) => {
            if (err) {
                res.writeHead(500);
                return res.end('Lỗi đổi tên file');
            }
            res.end('✅ Đã đổi tên file');
        });
        return;
    }

    // ===== FS: DELETE FILE =====
    if (path === '/delete-file') {
        fs.unlink('./files/new.txt', (err) => {
            if (err) {
                res.writeHead(500);
                return res.end('Lỗi xóa file');
            }
            res.end('✅ Đã xóa file');
        });
        return;
    }

    // ===== HTML =====
    let filePath = './views' + path;

    if (path === '/') {
        filePath = './views/index.html';
    }

    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
            return res.end('<h1>404 - Không tìm thấy trang</h1>');
        }

        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end(data);
    });

});

server.listen(8017, () => {
    console.log("🚀 Server chạy tại: http://localhost:8017");
});