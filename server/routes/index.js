const router = require('express').Router();
const user  = require('./userRoutes');
const task  = require('./taskRoutes');
const authorizer = require('../middlewares/authorizer');

router.use('/user',user)
router.use(authorizer)
router.use('/task',task)

module.exports = router