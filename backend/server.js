const express = require('express')
const connectToDB = require('./config/connect')
require('dotenv').config()

// connection to db
connectToDB();

// init app
const app = express()

// middlewares
app.use(express.json())

// running the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=> console.log(`Server Is Running in ${process.env.NODE_ENV} Mode on Port ${PORT}`))