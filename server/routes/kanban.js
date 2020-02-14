"use strict"

const router = require("express").Router()
const kanbanController = require("../controllers/kanban")
const authentication = require("../middleware/authentication")
const authorizeKanban = require("../middleware/authorizeKanban")

router.use(authentication)
router.post("/", kanbanController.createKanban)
router.get("/:id", kanbanController.findOne)
router.get("/", kanbanController.findAll)
router.put("/:id", authorizeKanban, kanbanController.update)
router.delete("/:id", authorizeKanban, kanbanController.remove)

module.exports = router