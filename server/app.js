require('dotenv').config()
const express = require('express')
const app = express()
const routes = require('./routes/routes')
const port = process.env.PORT || 3000
const cors = require('cors')
var server = require('http').Server(app);
var io = require('socket.io')(server);
const errorhandling = require('./errorhandling/errorhandling')

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use((req,res,next)=>{
  req.io = io
  next()
})

app.use(routes)

app.use(errorhandling)

server.listen(port);

io.on('connection', function (socket) {
  socket.on('my other event', function (data) {
    console.log(data);
  });
});