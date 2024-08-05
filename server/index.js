const express = require('express');
const initrouter = require('./routes/index');
const cookieParser = require('cookie-parser');
const dbconnect = require('./config/dbconnect');
const morgan = require('morgan');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8888;

// Kết nối database MongoDB
dbconnect();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));  // Phục vụ tệp tĩnh từ thư mục 'public'

app.use(morgan('common'));
app.use(cors({
    methods: ['POST', 'PUT', 'DELETE', 'GET'],
}));

// Đọc cookie
app.use(cookieParser());

// Xử lý yêu cầu favicon.ico
app.get('/favicon.ico', (req, res) => res.status(204));

initrouter(app);
const server = http.createServer(app);
const io = new Server(server);
io.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
app.set('socketio', io);
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

module.exports = app; // Xuất module để Vercel có thể sử dụng
