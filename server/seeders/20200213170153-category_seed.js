'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Categories', [
      {
        category_name : 'Backlog',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        category_name : 'Todo',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        category_name : 'Completed',
        createdAt : new Date(),
        updatedAt : new Date()
      },
      {
        category_name : 'Done',
        createdAt : new Date(),
        updatedAt : new Date()
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
     return queryInterface.bulkDelete('Categories', null, {});
  }
};
