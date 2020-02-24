const main = require('express').Router()
const user = require('../routes/user')
const task = require('../routes/task')

main.use('/user',user)
main.use('/task',task)


module.exports = main