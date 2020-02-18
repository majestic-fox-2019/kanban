'use strict';

const { generateHash } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class User extends Model {}

  User.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Email is required'
        },
        isEmail: {
          msg: 'Use a valid email format'
        },
        isUnique(value) {
          return User.findAll({
            where: {
              email: value
            }
          })
          .then(user => {
            if(user.length > 0) {
              throw new Error('Email already exist')
            }
          })
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password is required'
        },
        isRequired(value) {
          if(!value) {
            throw new Error('Password is required')
          }
        },
      },
    },
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        user.password = generateHash(user.password)
      },
    },
    sequelize
  });
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Task)
  };
  return User;
};