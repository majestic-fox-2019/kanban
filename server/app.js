"use strict"

if (process.env.NODE_ENV === "development") {
    require("dotenv").config()
}
const express = require("express")
const app = express()
const routes = require("./routes")
const cors = require("cors")
const errorHandler = require("./middleware/errorHandler")
const PORT = process.env.PORT || 3000
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(cors())
app.use("/", routes)
app.use(errorHandler)

io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on("add-kanban", () => {
        socket.emit("added-kanban")
        socket.broadcast.emit("added-kanban")
    })

    socket.on("edit-kanban", () => {
        socket.emit("edited-kanban")
        socket.broadcast.emit("edited-kanban")
    })

    socket.on("delete-kanban", () => {
        socket.emit("deleted-kanban")
        socket.broadcast.emit("deleted-kanban")
    })

    socket.on("next-kanban", () => {
        socket.emit("gonext-kanban")
        socket.broadcast.emit("gonext-kanban")
    })

    socket.on("back-kanban", () => {
        socket.emit("goback-kanban")
        socket.broadcast.emit("goback-kanban")
    })

    socket.on("drag-kanban", () => {
        socket.emit("draged-kanban")
        socket.broadcast.emit("draged-kanban")
    })
});

http.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))