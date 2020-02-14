'use strict';
module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize

  class Task extends Model{}

  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args : true,
          msg: "Title Cannot be null"
        },
        notEmpty: {
          args : true,
          msg: "Title Cannot be empty"
        }
    }
    }}, {sequelize});

  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo(models.User)
    Task.belongsTo(models.Category)
  };
  return Task;
};