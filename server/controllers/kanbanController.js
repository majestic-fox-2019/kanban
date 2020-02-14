const { Kanban, User } = require('../models');

class KanbanController {
  // show all my kanban
  static showAll(req, res, next) {
    const { id } = req.headers.user;
    User
      .findOne({
        where: {
          id
        },
        include: [Kanban]
      })
      .then(({ Kanbans }) => {
        res.status(200);
        res.json(Kanbans);
      }).catch((err) => {
        next(err);
      });
  }
  // create a kanban
  static create(req, res, next) {
    const { title, description } = req.body;
    const { id: UserId } = req.headers.user;
    Kanban
      .create({
        title,
        description,
        UserId
      })
      .then((result) => {
        res.status(201);
        res.json(result);
      })
      .catch((err) => {
        next(err)
      });
  }
  // patch kanban by id
  static patchKanban(req, res, next) {
    const { id } = req.params;
    const { category } = req.body;
    Kanban
      .update({
        category
      }, {
        where: {
          id
        },
        returning: true
      })
      .then((result) => {
        res.status(200);
        res.json(result);
      })
      .catch((err) => {
        next(err);
      });
  }
  // delete a kanban by id
  static async delete(req, res, next) {
    const { id } = req.params;
    const foundKanban = await Kanban
      .findOne({
        where: {
          id
        }
      });
    await Kanban
      .destroy({
        where: {
          id
        }
      });
    res.status(200);
    res.json(foundKanban);
  }
}

module.exports = KanbanController;