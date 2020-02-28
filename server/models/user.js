'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args : true,
          msg: "Username Cannot be null"
        },
        notEmpty: {
          args : true,
          msg: "Username Cannot be empty"
        }
    }},
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args : true,
          msg: "Email Cannot be null"
        },
        notEmpty: {
          args : true,
          msg: "Email Cannot be empty"
        }
    }},
    password:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args : true,
          msg: "Password Cannot be null"
        },
        notEmpty: {
          args : true,
          msg: "Password Cannot be empty"
        }
    }}
  }, {sequelize});

  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Task)
  };
  return User;
};