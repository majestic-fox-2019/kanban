'use strict';
module.exports = (sequelize, DataTypes) => {

  const { Model } = sequelize.Sequelize

  class Project extends Model {}

  Project.init({
    project_name: {
      type : DataTypes.STRING,
      validate : {
        notEmpty : {
          msg : 'Project name is required!'
        }
      }
    }
  }, {  sequelize })

  Project.associate = function(models) {
    Project.hasMany(models.Task)
  };
  return Project;
};