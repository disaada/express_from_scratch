'use strict';

const bycrypt = require('bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkInsert('Users', [{
      name: 'Disa Syuhada',
      password: bycrypt.hashSync('123', 10),
      email: 'disaada@gmail.com',
      avatar: '',
      birth_date: '1996-04-11',
      created_at: Sequelize.fn('NOW'),
      updated_at: Sequelize.fn('NOW')
    }], {})

  },

  down: async (queryInterface, Sequelize) => {
    
    await queryInterface.bulkDelete('Users', null, {})

  }
};
