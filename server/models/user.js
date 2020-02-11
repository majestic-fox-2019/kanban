'use strict';

const {hashPassword} = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {

  const {Model} = sequelize.Sequelize

  class User extends Model {}

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull : false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Name is empty"
        },
        notNull: {
          msg: "Name is empty"
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Email is empty"
        },
        notNull: {
          msg: "Name is empty"
        },
        isExist: (value => {
          return User.count({ where: { email: value}})
          .then(count => {
            if (count != 0){
              throw new Error('Email already exist.')
            }
          })
        })
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Password is empty"
        },
        notNull: {
          msg: "Password is empty"
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (instance, options) => {
        instance.password = hashPassword(instance.password)
      },
      beforeUpdate: (instance, options) => {
        instance.password = hashPassword(instance.password)
      }
    },
    sequelize});
  User.associate = function(models) {
    User.hasMany(models.Project)
  };
  return User;
};