if (process.env.NODE_ENV == 'test' || process.env.NODE_ENV == 'development') {
  require('dotenv').config()
}
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const http = require('http').createServer(app)
const io = require('socket.io')(http)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors())

const router = require('./routes')

app.use('/', router)

const errorHandler = require('./middlewares/errorHandler')

app.use(errorHandler)

io.on('connection', function(socket) {
  console.log('connection made')

  socket.on('updateTaskList', function() {
    socket.emit('taskUpdated')
    socket.broadcast.emit('taskUpdated')
  })

  socket.on('disconnect', function() {
    console.log('a user disconnected')
  })
})

http.listen(port, function() {
  console.log('Connect to port ' + port)
})
