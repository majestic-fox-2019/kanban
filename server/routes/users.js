const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('users');
});

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/g-signin", userController.gsignin);

module.exports = router;
