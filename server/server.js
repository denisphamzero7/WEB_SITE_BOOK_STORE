const express = require('express');
const initrouter= require('./routes/index');
const cookieParser = require('cookie-parser')
const dbconnect = require('./config/dbconnect')
const corOptions = require('./config/cors')
const morgan = require('morgan');
const cors = require('cors')
require('dotenv').config();
const app = express();
const port = process.env.PORT ||8888;
//kết nối database mongo db
dbconnect();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(morgan("common"));
app.use(cors({
    corOptions,
    methods:['POST', 'PUT', 'DELETE','GET'],
}));


// đọc cookie
app.use(cookieParser());
initrouter(app)

app.listen(port,()=>{
    console.log('running localhost ',+ port)
})