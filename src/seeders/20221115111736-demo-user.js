'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      username:'Truong Minh',
      password:'123456',
      email: 'example@example.com',
      firstName: 'John',
      lastName: 'Doe',
      address:'',
      phonenumber:'',
      userImg:'',
      gender:'1',
      roleId:'2',
      

      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
