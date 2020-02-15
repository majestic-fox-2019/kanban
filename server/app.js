if (process.env.NODE_ENV === "development") {
  require('dotenv').config()
}

const express = require('express')
const app = express()
const cors = require('cors')


// var server = require('http').Server(app);
// var io = require('socket.io')(server);


const port = process.env.PORT || 3000

const errorHandler = require('./middleware/errorHandler')
const routes = require('./routes/index')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
// app.use((req, res, next) => {
//   req.io = io
//   next()
// })
app.use('/', routes)
app.use(errorHandler)


app.listen(port, console.log(`server is running on ${port}`))