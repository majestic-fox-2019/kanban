'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  const { hash } = require('../helpers/bcrypt')

  class User extends Model {}

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Please fill in all fields'},
        notEmpty: {
          msg: 'Please fill in all fields'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
        msg: 'Please use the correct email format'
      },
        isUnique: function (value, next) {
          User.findOne({
            where: { email: value },
            attributes: ['id']
          })
            .done(function (error, user) {
              if (error)
                return next(error);
              if (user)
                return next('Email address already in use!');
              next();
            });
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: 'Please fill in all fields'},
        notEmpty: {
          msg: 'Please fill in all fields'
        },
        len: {
          args: 5,
          msg: 'Password must be at least 6 characters'
        }
      }
    }
  }, {
    hooks: {
    beforeCreate(instance) {
      // console.log('test')
    return hash(instance.dataValues.password)
    .then(hashedPass => {
      instance.dataValues.password = hashedPass
      // console.log(User.password);
    })
    .catch(err => {
      console.log(err)
    })
    }
  },
    sequelize
  })

  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Task)
    User.belongsToMany(models.Project, { through: models.ProjectUser })
  };
  return User;
};