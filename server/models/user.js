'use strict';
const bcrypt = require("../helpers")

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class User extends Model {}
  User.init({
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "fullname cant be empty"
        },
        len: {
          args: 5,
          msg: "char min 5 character"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          args: true,
          msg: "email is not valid"
        },
        notNull: {
          args: true,
          msg: "email cant be empty"
        },
        isUnique(value, next) {
          User.findOne({
            where: {
              email: value
            }
          })
          .then(result => {
            if(result) {
              next({code: 404, message: "email has already use"})
            } else {
              next()
            }
          })
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          args: true,
          msg: "password cant be empty"
        },
        len: {
          args: 8,
          msg: "password min 8 character"
        }
      }
    }
  }, {
    hooks:{
      beforeCreate: (user, options) => {
        user.password = bcrypt.hash(user.password)
      }
  },
    sequelize
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Task, {
      foreignKey: "UserId"
    })
  };
  return User;
};