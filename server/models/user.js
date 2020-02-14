'use strict';

const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class User extends Model {}

  User.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Name must be filled"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Title must be filled"
        },
        isEmail: {
          msg: "Email wrong format"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Password must be filled"
        }
      }
    }
  },
  {
    hooks: {
      beforeCreate: (user, option) => {
        user.password = bcrypt.hashSync(user.password, 10)
      }
    },
    sequelize
  })

  User.associate = function(models) {
    User.hasMany(models.Task)
  };
  
  return User;
};