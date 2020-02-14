const express = require('express')
const app = express()
const port = process.env.PORT || 3002
const cors = require('cors')
const routes = require('./routes')
const errorHandler = require('./helpers/errorHandler')
const createError = require('http-errors')
var server = require('http').Server(app);
var io = require('socket.io')(server);
require("dotenv").config()
app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.get('/', (req, res) => res.send('Hello World!'))
app.use((req,res,next) =>{
  req.io = io
  res.createError = createError
  next()
})
app.use(routes)
app.use(errorHandler)

server.listen(port, () => console.log(`Example app listening on port ${port}!`))
// io.on('connection', function (socket) {
  
//   socket.emit('test', 'testa');
// })