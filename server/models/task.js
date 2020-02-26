'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model
  class Task extends Model{}
  Task.init({
    UserId: DataTypes.INTEGER,
    title: {type: DataTypes.STRING, 
    validate: {
      notNull: {msg: "title must be filled"},
      notEmpty: {msg: "title must be filled"},
      max:{args: 20, msg: "max length for title is 50 character"}
    }, allowNull: false},
    category: {type: DataTypes.STRING,
    validate: {
      notNull: {msg: "category must be filled"},
      notEmpty: {msg: "category must be filled"}
    }, allowNull: false},
    status: DataTypes.STRING,
    date: {type: DataTypes.DATE,
      validate: {
        notNull: {msg: "date must be filled"},
        notEmpty: {msg: "date must be filled"},
        isAfter:{args: new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().substr(0,10), msg :"not avaible date"}
      }, allowNull: false}
  }, {sequelize})
  Task.associate = function(models) {
    // associations can be defined here
    Task.belongsTo(models.User)
  };
  return Task;
};