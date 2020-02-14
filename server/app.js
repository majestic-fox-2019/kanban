if (process.env.NODE_ENV == 'development') {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const http = require('http').createServer(app)
const cors = require('cors')
const PORT = process.env.PORT || 3000
const io = require('socket.io')(http)
const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

io.on('connection', function(socket) {
  console.log('a user connected')
  socket.on('changeTask', function(msg) {
    console.log(msg)
    socket.broadcast.emit('taskChanged', 'Yey!')
  })

  socket.on('newInvite', function(msg) {
    console.log(msg)
    socket.broadcast.emit('invitation', 'Astaghfirullah')
  })

  socket.on('acceptInvite', function(msg) {
    console.log(msg)
    socket.broadcast.emit('newDetail', 'Welcome')
  })
})

app.use('/', routes)
app.use(errorHandler)

http.listen(PORT, function() {
  console.log('app listening on port', PORT)
})
