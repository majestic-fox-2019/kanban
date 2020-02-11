'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Todo extends Model { }

  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notNull: { msg: "name is required" },
        notEmpty: { msg: "name is required" }
      },
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM(['Backlog', 'To-do', 'Doing', "Done"]),
      defaultValue: 'Backlog'
    },
    UserId: {
      type: DataTypes.INTEGER
    },
    ProjectId: {
      type: DataTypes.INTEGER
    }
  }, { sequelize })

  Todo.associate = function (models) {
    // associations can be defined here
    Todo.belongsTo(models.User)
    Todo.belongsTo(models.Project)

  };
  return Todo;
};