const { Task, Category } = require('../models/index')
class TaskController {
    static getTask(req, res, next) {
        Task
            .findAll({
                include: Category,
                order: [['id', 'ASC ']]
            })
            .then(tasks => {
                if (!tasks.length) {
                    res.status(404).json({ message: 'No data found' })
                } else {
                    res.status(200).json(tasks)
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static postTask(req, res, next) {
        const value = {
            name: req.body.task,
            CategoryId: req.body.categoryId,
            ProjectId: req.body.projectId
        }
        Task
            .create(value)
            .then(task => {
                res.status(200).json(task)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static putTask(req, res, next) {
        const value = {}
        if (req.body.name) {
            value.name = req.body.name
        } else {
            value.CategoryId = req.body.CategoryId
        }
        const option = {
            where: { id: req.params.id }
        }
        Task
            .update(value, option)
            .then(task => {
                res.status(200).json(task)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static deleteTask(req, res, next) {
        const option = { where: { id: req.params.id } }
        Task
            .destroy(option)
            .then(task => {
                res.status(200).json(task)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = TaskController