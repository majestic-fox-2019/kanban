const express = require('express')
const app = express()
const PORT = 3000
const routes = require('./routes/index')
const cors = require('cors')
const errors = require('./middlewares/errorHandler')
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended : true }))

app.use(function(req, res, next){
  req.io = io
  next()
})

app.use('/', routes)

app.use(errors.client)
app.use(errors.server)

server.listen(PORT, () => {
  console.log(`Running is port ${PORT}`)
})