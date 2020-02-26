'use strict'

if(process.env.NODE_ENV === 'development') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const cors = require('cors')
const routes = require('./routes')
const { errorHandler } = require('./middlewares/errorHandlers')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', routes)
app.use(errorHandler)

const server = app.listen(PORT, function() {
    console.log('Server started and listening to PORT', PORT)
})

const io = require('socket.io')(server);

io.on('connection', function(socket) {
    // console.log(socket.id)
    socket.on('SOMETHING_CHANGE', function() {
        io.emit('CHANGE')
    })
})