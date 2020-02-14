"use strict"

require('dotenv').config()
const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const route = require("./routes")
const cors = require("cors")
const errorHandler = require("./middleWares/errorHandler")

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended:true }))
app.use('/', route)
app.use(errorHandler)

app.listen(port,() => console.log(`app listen on port ${port}`))