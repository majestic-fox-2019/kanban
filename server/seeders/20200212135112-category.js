'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    
        return queryInterface.bulkInsert('Categories', [
          {
            nameCategory: 'Backlog',
            createdAt: new Date,
            updatedAt: new Date
          },
          {
            nameCategory: 'Todo',
            createdAt: new Date,
            updatedAt: new Date
          },
          {
            nameCategory: 'Done',
            createdAt: new Date,
            updatedAt: new Date
          },
          {
            nameCategory: 'Completed',
            createdAt: new Date,
            updatedAt: new Date
          },
      ], {});
  },
  
  down: (queryInterface, Sequelize) => {
    
     return queryInterface.bulkDelete('Categories', null, {});
  }
};
