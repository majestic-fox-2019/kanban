'use strict';
module.exports = (sequelize, DataTypes) => {

  const Sequelize = sequelize.Sequelize
  const Model = Sequelize.Model

  class Task extends Model { }
  Task.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'the name column cannot be empty' },
        notEmpty: { args: true, msg: 'the name column cannot be empty' }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { args: true, msg: 'the name column cannot be empty' },
        notEmpty: { args: true, msg: 'the name column cannot be empty' }
      }
    },
    category: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, { sequelize })

  Task.associate = function (models) {
    // associations can be defined here
  };
  return Task;
};