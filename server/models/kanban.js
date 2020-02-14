'use strict';
module.exports = (sequelize, DataTypes) => {
  // const Kanban = sequelize.define('Kanban', {
  //   UserId: DataTypes.INTEGER,
  //   title: DataTypes.STRING,
  //   category: DataTypes.ENUM,
  //   description: DataTypes.STRING
  // }, {});
  const { Model } = sequelize.Sequelize;
  class Kanban extends Model { };
  Kanban.init({
    UserId: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Title cannot be blank"
        }
      }
    },
    category: {
      type: DataTypes.ENUM,
      allowNull: false,
      values: ["backlog", "todo", "done", "completed"],
      defaultValue: "backlog"
    },
    description: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize
  });
  Kanban.associate = function (models) {
    // associations can be defined here
    Kanban.belongsTo(models.User);
  };
  return Kanban;
};