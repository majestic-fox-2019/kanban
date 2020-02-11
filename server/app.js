const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const cors = require('cors')
const IndexRouter = require('./routes/index')
const errorHandler = require('./middlewares/errorHandler')

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use('/', IndexRouter)
app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Listening to Port ${PORT}`)
})