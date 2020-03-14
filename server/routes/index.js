const express = require('express');
const router = express.Router();
const usersRouter = require('./users');
const kanbansRouter = require('./kanbans');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Kanban Server!");
});

router.use("/users", usersRouter);
router.use("/kanbans", kanbansRouter);

module.exports = router;
