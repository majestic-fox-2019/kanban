'use strict';
module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.Sequelize.Model

  class Task extends Model {
    get title(){
      return this.title
    }
  }

  Task.init({
    userId: {
      type: DataTypes.INTEGER
    },
    title: {
      type: DataTypes.STRING
    },
    category: {
      type: DataTypes.STRING
    }
  }, {
    hooks: {
      beforeUpdate: (user, next) => {
        let flag = false
        console.log(user.category)
        const categories = ["Backlog", "Todo", "Done", "Completed"]
        categories.forEach(categori => {
          if(categori === user.category){
            flag = true
          }
        })
        if(!flag) {
          next({code:400, message: "invalid category"})
        }
      }
    },sequelize});
  Task.associate = function(models) {
    // associations can be defined here
    models.User.belongsTo(Task, {
      as: "UserId",
      foreignKey: "userId"
    })
  };
  return Task;
};