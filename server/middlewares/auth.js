const createError = require('http-errors');
const { verifyToken } = require('../helpers/jwt');
const { User, Kanban } = require('../models');

module.exports = {
  authentication: async function (req, res, next) {
    const { access_token } = req.headers;
    try {
      const verified = verifyToken(access_token);
      const foundUser = await User
        .findOne({
          where: {
            email: verified.email
          }
        });
      if (!foundUser) {
        next(createError(401));
      }
      req.headers.user = foundUser;
      next();
    } catch (err) {
      next(err);
    }
  },
  authorization: async function (req, res, next) {
    const { id } = req.params;
    try {
      const kanban = await Kanban
        .findOne({
          where: {
            id
          }
        });
      if (!kanban) {
        next(createError(404));
      }
      else if (kanban.UserId !== req.headers.user.id) {
        next(createError(401));
      }
      next();
    } catch (err) {
      next(err);
    }
  }
};
