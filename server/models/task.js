'use strict';
module.exports = (sequelize, DataTypes) => {

  const {Model} = sequelize.Sequelize

  class Task extends Model {}
  
  Task.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    CategoryId: DataTypes.INTEGER,
    UserId:DataTypes.INTEGER
  }, {sequelize});

  Task.associate = function(models) {
    Task.belongsTo(models.Category)
    Task.belongsTo(models.User)
  };
  return Task;
};