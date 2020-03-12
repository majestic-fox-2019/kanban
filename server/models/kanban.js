'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Kanban extends Model { }
  Kanban.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your title'
        },
      }
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your category'
        },
      }
    },
    assignTo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your assign to'
        },
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your description'
        },
      }
    },
    UserId: {
      type: DataTypes.INTEGER
    }
  }, {
    sequelize
  });
  Kanban.associate = function (models) {
    // associations can be defined here
    Kanban.belongsTo(models.User)
  };
  return Kanban;
};