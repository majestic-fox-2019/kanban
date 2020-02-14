if (process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
var server = require('http').Server(app);
var io = require('socket.io')(server);
const PORT = process.env.PORT || 3000
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')
const indexRoutes = require('./routes/index')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
    req.io = io
    next()
})

app.use(indexRoutes)
app.use(errorHandler)

// 
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
// })
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})