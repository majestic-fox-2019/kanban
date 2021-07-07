'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize

  class Task extends Model{}

  Task.init({
    title:{
      type: DataTypes.STRING,
      allowNull : false,
      validate :{
        notNull : {msg : "title cannot be empty"},
        notEmpty : {msg : "title cannot be empty"}
      }
    }, 
    category:{
      type: DataTypes.STRING,
      allowNull : false,
      validate :{
        notNull : {msg : "category cannot be empty"},
        notEmpty : {msg : "category cannot be empty"}
      }
    },

    UserId: DataTypes.INTEGER

  },{sequelize})
 
 
  Task.associate = function(models) {
    Task.belongsTo(models.User)
    // associations can be defined here
  };
  return Task;
};