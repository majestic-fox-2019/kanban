"use strict";

const { Task } = require("../models");
const { Category } = require("../models");

class TaskController {
  static read(req, res, next) {
    Task.findAll()
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        next(err);
      });
  }

  static showEdit(req, res, next) {
    Task.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        next(err);
      });
  }

  static add(req, res, next) {
    const { title, CategoryId, UserId } = req.body;
    const create = {
      title,
      CategoryId,
      UserId
    };
    Task.create(create)
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        next(err);
      });
  }

  static update(req, res, next) {
    const taskId = req.params.id;
    const { title, category, CategoryId } = req.body;
    const findOne = Task.findOne({
      where: {
        id: taskId
      }
    });
    const update = Task.update(
      {
        title,
        category,
        CategoryId
      },
      {
        where: {
          id: taskId
        }
      }
    );
    Promise.all([findOne, update])
      .then(result => {
        res.status(200).json(result[0]);
      })
      .catch(err => {
        next(err);
      });
  }

  static destroy(req, res, next) {
    const destroyId = req.params.id;
    Task.destroy({
      where: {
        id: destroyId
      }
    })
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        next(err);
      });
  }

  static getAllData(req, res, next) {
    Category.findAll({
      include: {
        model: Task
      },
      order: [["id", "asc"]]
    })
      .then(result => {
        res.status(200).json(result);
      })
      .catch(err => {
        next(err);
      });
  }
}

module.exports = TaskController;
