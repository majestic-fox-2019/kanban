'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { args: true, msg: 'name is required' }
      }
    },
    assignTo: {
      type: DataTypes.STRING
    },
    category: {
      type: DataTypes.ENUM,
      values: ['back-log', 'todo', 'doing', 'done'],
      defaultValue: 'back-log',
      validate: {
        notEmpty: { args: true, msg: 'category is required' }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize
  });
  Task.associate = function (models) {
    // associations can be defined here
    Task.belongsTo(models.User)
  };
  return Task;
};