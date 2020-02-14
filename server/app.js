const express = require('express')
const app = express()
const port = 3000
const TaskRouter = require('./routes/taskRouter')
const cors = require("cors")
const UserRouter = require('./routes/userRouter')
const ErrorHandler = require('./middlewares/error_handling')
const authentication = require('./middlewares/authentication')

app.use(cors())
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(express.json()) // for parsing application/json

app.use('/', UserRouter)
// app.use(authentication)
app.use('/tasks', TaskRouter)


app.use(ErrorHandler)

app.listen(port, () => console.log(`Listening on port ${port}!`))