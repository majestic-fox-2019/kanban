if(process.env.NODE_ENV == "development"){
    require('dotenv').config()
}
const express = require('express')
const cors = require('cors')
const app = express()
var server = require('http').Server(app);
var io = require('socket.io')(server);
const index = require('./routes/index')
const errorHandling = require('./helper/erroHandling')

const PORT = process.env.PORT || 3000
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use((req,res,next)=>{
    req.io=io
    next()
})
app.use('/',index)
app.use(errorHandling)

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
      console.log(data);
    });
  });
// app.listen(PORT,()=>{
//     console.log(`listening on ${PORT}`)
// })
server.listen(PORT,()=>{
    console.log(`listening on ${PORT}`)
})