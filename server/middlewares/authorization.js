const { Task } = require("../models");

module.exports = (req, res, next) => {
  Task.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(result => {
      if (!result) {
        throw {
          statusCode: 404,
          msg: "No data found!"
        };
      } else if (result.UserId == req.user.id) {
        next();
      } else {
        throw {
          statusCode: 404,
          msg: "You don't have an access!"
        };
      }
    })
    .catch(err => {
      next(err);
    });
};
