if(!process.env.NODE_ENV || process.env.NODE_ENV == "development") {
  require('dotenv').config()
}
const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
const routes = require('./routes/index')
const errorHandler = require('./middlewares/errHandler')
var server = require('http').Server(app);
var io = require('socket.io')(server);


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(function(req,res, next) {
  req.io = io
  next()
})
app.use('/', routes)
app.use(errorHandler)

// io.on('connection', function (socket) {
//   socket.emit('news', { hello: 'world' });
//   socket.on('my other event', function (data) {
//     console.log(data);
//   });
// });
server.listen(port, () => console.log(`Example app listening on port ${port}!`))
// app.listen(port, () => console.log(`Example app listening on port ${port}!`))