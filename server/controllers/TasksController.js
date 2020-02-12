"use strict"

const Task = require('../models').Task;
class TasksController {
    // static listPerProject(req, res, next) {
    //     Task
    //         .findAll({
    //             where: {
    //                 "ProjectId": Number(req.params.projectId)
    //             }
    //         })
    //         .then(tasks => {
    //             res.status(200).json(tasks);
    //         })
    //         .catch(err => {
    //             next(err);
    //         })
    // }

    static add(req, res, next) {
        const {title, description, UserId, ProjectId} = req.body;
        Task
            .create({title, description, UserId, ProjectId})
            .then(newData => {
                res.status(201).json(newData);
            })
            .catch(err => {
                next(err);
            })
    }

    static update(req, res, next) {
        const {title, description, UserId, ProjectId} = req.body;
        Task
            .update({title, description, UserId, ProjectId}, {
                where: {
                    id: Number(req.params.id)
                },
                returning: true
            })
            .then(updateTask => {
                res.status(200).json(updateTask[1][0] || "Data not found!");
            })
            .catch(err => {
                next(err);
            })
    }

    static delete(req, res, next) {
        Task
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

module.exports = TasksController;