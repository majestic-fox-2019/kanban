'use strict';

const bcrypt = require('../helper/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class User extends Model { }

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'name is required' }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'email is required' },
        checkUnique(data) {
          return User.findOne({ where: { email: data } })
            .then(user => {
              if (user) {
                throw new Error('Email address already in use!')
              }
            })
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'password is required' }
      }
    }
  }, {
    sequelize,
    hooks: {
      beforeCreate: (user, options) => {
        let pass = user.password
        let newPass = bcrypt.generatePassword(pass)
        user.password = newPass
      }
    }
  });
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Task)
  };
  return User;
};