require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
const routes = require('./router/index')
const errHandler = require('./middlewares/errHandler')
const http = require("http").createServer(app)
const io = require("socket.io")(http)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', routes)

app.use(errHandler)

// app.listen(port, () => {
//     console.log(`app is listening to ${port}`)
// })

io.on("connection", function (socket) {
    console.log("================ A USER HAS CONNECTED ==============================")
    socket.on("logged in", function (value) {
        console.log("======================" + value + "======================")
        socket.emit("login-server", "oke diterima di server")
    })
    socket.on("ada-status-update", function (value) {
        console.log("=================" + value + "===========")
        socket.broadcast.emit("updated")
    })
    socket.on("deleteTodo", function () {
        socket.broadcast.emit("todoDeleted")
    })
    socket.on("nambahMembernya", function () {
        socket.broadcast.emit("nambahlohMembernya")
    })
    socket.on("tasknyaNambahya", function () {
        socket.broadcast.emit("sudahtertambahtasknya")
    })
    socket.on("ada-project-didelete", function () {
        socket.broadcast.emit("okeDeleted")
    })
})

http.listen(port, function () {
    console.log(`http is listing on port ${port}`)
})
