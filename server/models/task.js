'use strict';
module.exports = (sequelize, DataTypes) => {
  const {Model} = sequelize.Sequelize
  class Task extends Model{}
  Task.init({
    title: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:true
      }},
    CategoryId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notEmpty:true
      }},
    UserId: {
      type:DataTypes.INTEGER,
      allowNull:false,
      validate:{
        notEmpty:true
      }}
  },{sequelize})
  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo(models.User)
    Task.belongsTo(models.Category)
  };
  return Task;
};