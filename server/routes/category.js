const express = require('express');
const router = express.Router();
const Controller = require("../controllers/category");
const authentication = require('../middlewares/authentication')
// const authorized = require('../middlewares/authorized')
// router.use(authentication)
router.get('/', Controller.findAll)
// router.get('/:id', authorized, Controller.findOne)
// router.post('/', Controller.create)
// router.put('/:id',authorized,  Controller.update)
// router.delete('/:id', authorized, Controller.destroy)

module.exports = router