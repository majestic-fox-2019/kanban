if(process.env.NODE_ENV == 'development') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.port || 3000
const errorHandler = require('./middlewares/errorHandler')
const routes = require('./routers')
const http = require('http').createServer(app);
const io = require('socket.io')(http);
var connectedUser = 0

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/', routes)

io.on('connection', function(socket){
    connectedUser ++
    console.log(connectedUser + ' user connected');
    socket.on('disconnect', function(){
        connectedUser --
        console.log(connectedUser + ' user connected');
      });

    socket.on('taskUpdated', function(projectId){
        socket.broadcast.emit('someoneUpdatedaTask', projectId)
    })

    socket.on('memberUpdated', function(details){
        socket.broadcast.emit('someoneUpdatedAMember', details)
    })

    socket.on('memberKicked', function(details){
        // console.log(details);
        socket.broadcast.emit('kickedMember', details)
    })

    socket.on('projectUpdated', function(projectId) {
        socket.broadcast.emit('projectUpdate', projectId)
    })
  });

app.use(errorHandler)

http.listen(port, ()=>{
    console.log(`app is running on port: ${port}`)
})