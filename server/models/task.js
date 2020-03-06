'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model;

  class Task extends Model {

  }
  Task.init({
    title: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notEmpty : {
          args : true,
          msg : 'title is required'
        }
      }
    },
    category: DataTypes.STRING,
    UserId: DataTypes.STRING,
    status: DataTypes.NUMBER
  }, {sequelize});
  Task.associate = function(models) {
    Task.belongsTo(models.User)
  };
  return Task;
};