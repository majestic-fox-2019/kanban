'use strict';
module.exports = (sequelize, DataTypes) => {
  const {Model} = sequelize.Sequelize
  class Category extends Model{}
  Category.init({
    name: {
      type:DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:true
      }
    }
  },{sequelize})
  // const Category = sequelize.define('Category', {
  // }, {});
  Category.associate = function(models) {
    // associations can be defined here
    Category.hasMany(models.Task)
  };
  return Category;
};