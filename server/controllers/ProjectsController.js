"use strict"

const Project = require('../models').Project;

class ProjectsController {
    static list(req, res, next) {
        Project
            .findAll({
                include: ["Tasks"],
                order: [
                    ["createdAt", "asc"],
                    ["Tasks", "createdAt", "desc"]
                ]
            })
            .then(projects => {
                res.status(200).json(projects);
            })
            .catch(err => {
                console.log(err);
                next(err);
            });
    }

    static add(req, res, next) {
        const {name} = req.body;
        Project
            .create({name})
            .then(resCreate => {
                res.status(201).json(resCreate);
            })
            .catch(err => {
                next(err);
            })
    }

    static update(req, res, next) {
        const {name} = req.body;
        Project
            .update({name}, {
                where: {
                    id: Number(req.params.id)
                },
                returning: true
            })
            .then(updateProject => {
                res.status(200).json(updateProject[1][0] || "Data not found!");
            })
            .catch(err => {
                next(err);
            })
    }

    static delete(req, res, next) {
        Project
            .destroy({
                where: {
                    id: Number(req.params.id)
                }
            })
            .then(deleted => {
                if (!deleted) {
                    res.status(200).json({message: "Data not found!"});                
                }else{
                    res.status(200).json({message: "Data has been deleted!"});
                }
            })
            .catch(err => {
                next(err);
            })
    }
}

module.exports = ProjectsController;