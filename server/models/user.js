'use strict';
const encryptPassword = require('../helpers/generatePassword')

module.exports = (sequelize, DataTypes) => {
  const {Model} = sequelize.Sequelize
  class User extends Model{}
  User.init({
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:true
      }},
    password: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:true
      }},
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:true
      }},
    username: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:true
      }}
  }, {hooks:{
    beforeCreate(user, options){
      user.password = encryptPassword(user.password)
    }
  },sequelize})
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Task)
  };
  return User;
};