const modelTodo = require("../models").Todo
const modelProject = require("../models").Project
class TodoController {


    static getMine(req, res, next) {
        modelTodo.findAll(
            { where: { UserId: req.payload.id }, order: [["id", "DESC"]] })
            .then(myTodos => {
                if (myTodos) {
                    res.status(200).json(myTodos)
                }
            })
            .catch(err => {
                next(err)
            })
    }
}

module.exports = TodoController