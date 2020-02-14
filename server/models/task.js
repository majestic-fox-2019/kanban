'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize
  class Task extends Model { }
  Task.init({
    name: DataTypes.STRING,
    CategoryId: DataTypes.INTEGER
  }, { sequelize });
  Task.associate = function (models) {
    // associations can be defined here
    Task.belongsTo(models.Category)
    Task.belongsTo(models.Project)
  };
  return Task;
};