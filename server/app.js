require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
const routes = require('./router/index')
const errHandler = require('./middlewares/errHandler')
const http = require("http").createServer(app)

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/', routes)

app.use(errHandler)

app.listen(port, () => {
    console.log(`app is listening to ${port}`)
})

// http.listen(3000, function () {
//     console.log("http is listening")
// })
