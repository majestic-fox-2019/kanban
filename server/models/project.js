'use strict';
module.exports = (sequelize, DataTypes) => {

  const {Model} = sequelize.Sequelize

  class Project extends Model {}

  Project.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "Title Project is empty"
        },
        notNull: {
          msg: "Title Project is empty"
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {sequelize});

  Project.associate = function(models) {
    Project.belongsTo(models.User)
    Project.hasMany(models.Task)
  };
  return Project;
};