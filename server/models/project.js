'use strict';
module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define('Project', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {});
  Project.associate = function(models) {
    Project.hasMany(models.Task)
  };
  return Project;
};