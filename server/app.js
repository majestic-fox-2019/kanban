"use strict"

const express = require('express')
const app = express()
const port = process.env.port || 3000
const cors = require('cors')
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/', routes)
app.use(errorHandler)

io.on('connection', function (socket) {
    console.log('a user connected NICE');

    socket.on('create', function () {
        io.emit('created')

    })

    socket.on('accept', function () {
        io.emit('accepted')

    })

    socket.on('decline', function () {
        io.emit('declined')

    })

    socket.on('move', function () {
        io.emit('moved')

    })

    socket.on('delete', function () {
        io.emit('deleted')

    })

    socket.on('update', function () {
        io.emit('updated')

    })
});

http.listen(port, function () {
    console.log(`Example app listening on port ${port}!`);
});


// app.listen(port, () => console.log(`Example app listening on port ${port}!`))
