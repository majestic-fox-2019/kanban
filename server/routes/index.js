const router = require('express').Router();
const user  = require('./userRoutes');
const task  = require('./taskRoutes');
const authorizer = require('../middlewares/authorizer');

router.use('/user',user)
router.use('/task',authorizer ,task)

module.exports = router