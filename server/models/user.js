'use strict'
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class User extends Model {}

  User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Name is required'
          }
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Email is required'
          },
          isEmail: {
            msg: 'Wrong email format'
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Password is required'
          },
          len: {
            args: 5,
            msg: 'Password characters min. 6'
          }
        }
      },
      platform: {
        type: DataTypes.ENUM,
        values: ['google', 'normal'],
        allowNull: false,
        validate: {
          notEmpty: {
            msg: 'Platform is required'
          }
        }
      }
    },
    { sequelize }
  )

  User.beforeCreate((user, options) => {
    const hash = require('../helpers/hash')
    return hash(user.password)
      .then((hashedPass) => {
        user.password = hashedPass
      })
      .catch((err) => {
        console.log(err)
      })
  })

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Task)
  }
  return User
}
