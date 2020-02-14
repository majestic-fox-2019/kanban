if (process.env.NODE_ENV == 'development') {
    require('dotenv').config()
}

const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const categoryRoute = require('./routes/category')
const taskRoute = require('./routes/task')
const projectRoute = require('./routes/project')
const userRoute = require('./routes/user')
const cors = require('cors')
const errorHandler = require('./middleware/errorHandling')
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/category', categoryRoute)
app.use('/task', taskRoute)
app.use('/project', projectRoute)
app.use('/', userRoute)
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on ${PORT}`))