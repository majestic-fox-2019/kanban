'use strict';

const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize

  class User extends Model { }

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Name should not be empty!'
        },
        notEmpty: {
          args: true,
          msg: 'Name should not be empty!'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'E-mail should not be empty!'
        },
        notEmpty: {
          args: true,
          msg: 'E-mail should not be empty!'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Password should not be empty!'
        },
        notEmpty: {
          args: true,
          msg: 'Password should not be empty!'
        }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user, option) => {
        let hash = bcrypt.hashSync(user.password, 10)
        user.password = hash
      }
    }
  })
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Task)
  };
  return User;
};