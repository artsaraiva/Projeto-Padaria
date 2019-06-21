'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'order_products',
      'amount',
      {
        type: Sequelize.INTEGER,
        allowNull: false
      }
    )
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn(
      'order_products',
      'amount',
      {
        type: Sequelize.DOUBLE,
        allowNull: false
      }
    )
  }
}
