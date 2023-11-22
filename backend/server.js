const express = require('express')
const connectToDB = require('./config/connect');
const { errorHandler, notFound } = require('./middlewares/error');
const cors = require('cors')
require('dotenv').config()

// connection to db
connectToDB();

// init app
const app = express()

// middlewares
app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000"
}))

// routes
app.use('/api/auth', require('./routes/authRoute'))
app.use('/api/users', require('./routes/usersRoute'))
app.use('/api/posts', require('./routes/postsRoute'))
app.use('/api/comments', require('./routes/commentsRoute'))
app.use('/api/categories', require('./routes/categoriesRoute'))

// Error Handler Middleware
app.use(notFound);
app.use(errorHandler);

// running the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=> console.log(`Server Is Running in ${process.env.NODE_ENV} Mode on Port ${PORT}`))