const http = require('http');
const fs = require('fs');
const url = require('url');

const bikeEmitter = require('./events/AppEmitter');
const TextTransform = require('./streams/TextTransform');
const EchoDuplex = require('./streams/EchoDuplex');

// DATA
let bikes = [
    { id: 1, name: "Honda Vision", status: "Available" },
    { id: 2, name: "Air Blade", status: "Available" },
    { id: 3, name: "Winner X", status: "Renting" },
    { id: 4, name: "R15 V3 ", status: "Renting" },
    { id: 5, name: "SH", status: "Available" }
];

// EVENT
    bikeEmitter.on('rent', msg => {
        fs.appendFileSync('./data/log.txt', msg + '\n');
    });

    bikeEmitter.on('return', msg => {
        fs.appendFileSync('./data/log.txt', msg + '\n');
    });

    bikeEmitter.on('custom', msg => {
        fs.appendFileSync('./data/log.txt', msg + '\n');
    });

    bikeEmitter.once('custom', msg => {
    fs.appendFileSync('./data/log.txt', '🔥 FIRST TIME: ' + msg + '\n');
    });

http.createServer((req, res) => {

    const parsedUrl = url.parse(req.url, true);

    // ================= CSS =================
    if (req.url === '/style.css') {
        const css = fs.readFileSync('./public/style.css');
        res.writeHead(200, { 'Content-Type': 'text/css' });
        return res.end(css);
    }

    // ================= IMAGE =================
    if (req.url.startsWith('/images/')) {
        const filePath = './public' + req.url;

        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(404);
                return res.end("Image not found");
            }

            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
            res.end(data);
        });

        return;
    }

    // ================= HOME =================
    if (req.url === '/') {
        const html = fs.readFileSync('./views/index.html');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        return res.end(html);
    }

    // ================= ADMIN =================
    if (req.url === '/admin') {
        const html = fs.readFileSync('./views/admin.html');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        return res.end(html);
    }

    // ================= EVENTS PAGE =================
    if (req.url === '/event') {
        const time = new Date().toLocaleString();
        bikeEmitter.emit('custom', `Custom event lúc ${time}`);
        return res.end("OK");
    }

    // ================= TRIGGER EVENT =================
    if (req.url === '/event') {
        bikeEmitter.rentBike(1);
        bikeEmitter.emit('custom', 'Custom event triggered');

        return res.end("Event triggered!");
    }

    // CLEAR LOG
    if (req.url === '/clear-log') {
        fs.writeFileSync('./data/log.txt', ''); // xóa nội dung file
        return res.end("Log cleared");
    }

    // ================= REQUEST =================
    if (req.url.startsWith('/request')) {

        res.writeHead(200, { 'Content-Type': 'text/html' });

        res.write(`<h2>Request Info</h2>`);
        res.write(`<p><b>URL:</b> ${req.url}</p>`);
        res.write(`<p><b>Method:</b> ${req.method}</p>`);

        res.write(`<h3>Headers:</h3>`);
        res.write(`<pre>${JSON.stringify(req.headers, null, 2)}</pre>`);

        return res.end();
    }

    // ================= STREAM PAGE =================
    if (req.url === '/streams') {
        const html = fs.readFileSync('./views/streams.html');
        res.writeHead(200, { 'Content-Type': 'text/html' });
        return res.end(html);
    }

    // ================= JSON =================
    if (req.url === '/json') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({ bikes }));
    }

    // ================= RENT =================
    if (parsedUrl.pathname === '/rent') {
        const id = parseInt(parsedUrl.query.id);
        const bike = bikes.find(b => b.id === id);

        if (bike && bike.status === "Available") {
            bike.status = "Renting";
            bikeEmitter.rentBike(id);
        }

        return res.end("OK");
    }

    // ================= RETURN =================
    if (parsedUrl.pathname === '/return') {
        const id = parseInt(parsedUrl.query.id);
        const bike = bikes.find(b => b.id === id);

        if (bike) {
            bike.status = "Available";
            bikeEmitter.returnBike(id);
        }

        return res.end("Returned");
    }

    // ================= READABLE =================
    if (req.url === '/read-file') {
        const stream = fs.createReadStream('./data/bikes.txt');
        return stream.pipe(res);
    }

    // ================= WRITABLE =================
    if (req.url === '/write-file' && req.method === 'POST') {

    let body = '';

    req.on('data', chunk => body += chunk);

    req.on('end', () => {

        const params = new URLSearchParams(body);
        const text = params.get('text');

        fs.appendFileSync('./data/log.txt', text + '\n');

        res.end("OK");
    });

    return;
}

    // ================= TRANSFORM =================
    if (req.url === '/transform') {
        const read = fs.createReadStream('./data/bikes.txt');
        const transform = new TextTransform();

        return read.pipe(transform).pipe(res);
    }

    // ================= DUPLEX =================
    if (req.url === '/duplex') {
        const duplex = new EchoDuplex();

        return req.pipe(duplex).pipe(res);
    }

    // ================= DOWNLOAD LOG =================
    if (req.url === '/download-log') {
    res.writeHead(200, {
        'Content-Type': 'text/plain; charset=UTF-8'
    });

    const stream = fs.createReadStream('./data/log.txt');
    return stream.pipe(res);
}

    if (req.url === '/add-bike' && req.method === 'POST') {

    let body = '';

    req.on('data', chunk => {
        body += chunk.toString();
    });

    req.on('end', () => {

        const params = new URLSearchParams(body);
        const name = params.get('name');

        const newBike = {
            id: bikes.length + 1,
            name: name,
            status: "Available"
        };

        bikes.push(newBike);

        res.writeHead(302, { Location: '/admin' });
        res.end();
    });

    return;
}

    // ================= 404 =================
    res.writeHead(404);
    res.end("404 Not Found");

}).listen(3000, () => {
    console.log("🚀 Server running at http://localhost:3000");
});