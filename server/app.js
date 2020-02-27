require('dotenv').config()

const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const PORT = process.env.PORT || 3000
const cors = require('cors')

const route = require('./routes')

const errorHandler = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended:true }))

app.use((req, res, next) => {
    req.io = io
    next()
})
app.use(route)
app.use(errorHandler)

server.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`)
})