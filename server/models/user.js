'use strict';
const { encryptPassword } = require('../helper/helper')

module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  class User extends Model { }

  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Email is required'
        },
        notNull: {
          msg: 'Email is required'
        },
        isEmail: {
          msg: 'Incorrect email format, e.g: example@mail.com'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: 'Password is required'
        },
        len: {
          args: [8, 20],
          msg: 'Password at least 8 character'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.password = encryptPassword(user.password)
      }
    }, sequelize
  });
  User.associate = function (models) {
    // associations can be defined here
  };
  return User;
};