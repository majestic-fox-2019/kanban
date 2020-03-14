'use strict';

const { hashPassword } = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;
  class User extends Model { };
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Please enter your name"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: "Email cannot be blank"
        },
        isEmail: {
          msg: "Email is invalid!"
        }
      },
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Password cannot be blank"
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.password = hashPassword(user.password);
      },
    },
    sequelize
  });
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Kanban);
  };
  return User;
};