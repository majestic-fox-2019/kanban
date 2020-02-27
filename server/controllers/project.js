const { Project } = require('../models/index')
class ProjectController {
    static getProject(req, res, next) {
        Project
            .findAll({
                where: {UserId : req.loggedUserId},
            })
            .then(projects => {
                if (!projects.length) {
                    res.status(404).json({ message: 'No data found' })
                } else {
                    res.status(200).json(projects)
                }
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static postProject(req, res, next) {
        const value = {
            name: req.body.name,
            description: req.body.description,
            UserId: req.loggedUserId
        }
        Project
            .create(value)
            .then(project => {
                res.status(200).json(project)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
    static putProject(req, res, next) {
        const value = {}
        if (req.body.name) {
            value.name = req.body.name
        } else {
            value.CategoryId = req.body.CategoryId
        }
        const option = {
            where: { id: req.params.id }
        }
        Project
            .update(value, option)
            .then(project => {
                res.status(200).json(project)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }

    static deleteProject(req, res, next) {
        const option = { where: { id: req.params.id } }
        Project
            .destroy(option)
            .then(project => {
                res.status(200).json(project)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = ProjectController