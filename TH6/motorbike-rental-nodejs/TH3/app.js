const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('public'));

const items = [
{
id: 1,
name: 'Honda Vision',
description: 'Xe tay ga hiện đại, thoải mái, trẻ trung',
price: 200000,
image: '/images/vision.jpg',
hot: true
},
{
id: 2,
name: 'Yamaha Exciter',
description: 'Thiết kế trẻ trung, mạnh mẽ, động cơ vượt trội',
price: 150000,
image: '/images/exciter.jpg',
hot: false
},
{
id: 3,
name: 'Honda SH',
description: 'Chạy êm, sang trọng',
price: 180000,
image: '/images/sh.jpg',
hot: true
},
{
id: 4,
name: 'Raider',
description: 'Kiểu dáng thể thao',
price: 220000,
image: '/images/raider.jpg',
hot: false
},
{
id: 5,
name: 'Honda AB',
description: 'Xe tay ga được ưa chuộng',
price: 250000,
image: '/images/airblade.jpg',
hot: true
}
];

app.get('/', (req, res) => {
res.render('index', { title: 'Trang chủ' });
});

app.get('/list', (req, res) => {
res.render('list', {
title: 'Danh sách xe E-Bike',
items: items
});
});

app.get('/contact', (req, res) => {
res.render('contact', { title: 'Liên hệ' });
});

app.get('/detail/:id', (req, res) => {
const id = parseInt(req.params.id);
const item = items.find(x => x.id === id);

if (!item) return res.send('Không tìm thấy xe');

res.render('detail', {
title: 'Chi tiết xe',
item: item
});
});

app.listen(3000, () => {
console.log('Server running at http://localhost:3000');
});