if (process.env.NODE_ENV === 'development') {
  require("dotenv").config()
}

const express = require('express')
const app = express()
var server = require('http').Server(app);
var io = require('socket.io')(server);
const port = 3000
const routes = require('./routes/index')
const errorHandling = require('./helpers/errorHandling')
const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  req.io = io
  next()
})

app.use('/', routes)

app.use(errorHandling)

// io.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });

// app.listen(port, () => console.log(`Listening on port ${port}!`))
server.listen(port, () => console.log(`Listening on port ${port}!`))

