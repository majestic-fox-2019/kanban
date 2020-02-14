const express = require('express');
const router = express.Router();
const { authentication, authorization} = require('../middlewares/auth');
const kanbanController = require('../controllers/kanbanController');

router.use(authentication);
router.get("/", kanbanController.showAll);
router.post("/", kanbanController.create);
router.patch("/:id", authorization, kanbanController.patchKanban);
router.delete("/:id", authorization, kanbanController.delete);

module.exports = router;
