'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('products', [{
      name: 'Coxinha',
      code: '0002',
      price: 3,
      type: 'salgado',
      quantity: 5,
      minimum_quantity: -1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      name: 'Café',
      code: '0003',
      price: 2,
      type: 'bebida',
      quantity: 20,
      minimum_quantity: -1,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('products', null, {})
  }
}
