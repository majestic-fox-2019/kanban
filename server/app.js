if (process.env.NODE_ENV === "development") {
  require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000

const errorHandler = require('./middleware/errorHandler')
const routes = require('./routes/index')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/', routes)
app.use(errorHandler)


app.listen(port, console.log(`server is running on ${port}`))