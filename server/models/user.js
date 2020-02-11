'use strict'
const { hashPass } = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class User extends Model {}
  User.init(
    {
      name: DataTypes.STRING,
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            msg: 'Invalid email format'
          },
          notEmpty: {
            msg: 'Email is required'
          },
          isUnique(val) {
            return User.findOne({ where: { email: val } }).then(result => {
              if (result) {
                throw 'User already existed'
              }
            })
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          min: {
            args: 6,
            msg: 'Password minimun 6 character'
          }
        }
      }
    },
    {
      hooks: {
        beforeCreate(instance) {
          const hash = hashPass(instance.password)
          instance.password = hash
        }
      },
      sequelize
    }
  )
  User.associate = function(models) {
    // associations can be defined here
    User.belongsToMany(models.Project, { through: models.UserProject })
  }
  return User
}
