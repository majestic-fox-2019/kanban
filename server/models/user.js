'use strict';
const errors = require('http-errors')
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {

  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class User extends Model { }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'the name column cannot be empty' },
        notEmpty: { args: true, msg: 'the name column cannot be empty' }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmailUniq(value) {
          return User.findOne({ where: { email: value } })
            .then(resultEmail => {
              if (resultEmail) {
                throw errors('406', 'Not Acceptable')
              }
            })
        }
      }
    },
    password: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.password = bcrypt.hashSync(user.password, 10)
      }
    },
    sequelize
  })

  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Task)
  };
  return User;
};