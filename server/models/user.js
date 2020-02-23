'use strict';

const {hasher} = require('../helpers/bcrypt');

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class User extends Model{

  }

  User.init({
    email: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          args : true,
          msg : 'Email is required'
        },
        isUnique(value){
          return User.findOne({
            where : {
              email : value
            }
          })
          .then(result => {
            if(result){
              throw new Error('Email already in use')
            }
          })
        },
        isEmail : {
          msg : 'Please enter a valid email'
        }
      }
    },
    password: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          args : true,
          msg : 'Password is required'
        }
      }
    }
  }, {
    hooks : {
      beforeCreate : (instance, options)=>{
        instance.password = hasher(instance.password)
      }
    },
    sequelize
  });

  User.associate = function(models) {
    User.hasMany(models.Task, {
      foreignKey : 'UserId'
    })
  };
  return User;
};