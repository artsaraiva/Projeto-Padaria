'use strict'

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('order_products', {
      amount: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      value: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      orderId: {
        allowNull: false,
        onDelete: 'CASCADE',
        primaryKey: true,
        references: {
          key: 'id',
          model: 'orders'
        },
        type: Sequelize.INTEGER
      },
      productId: {
        allowNull: false,
        onDelete: 'CASCADE',
        primaryKey: true,
        references: {
          key: 'id',
          model: 'products'
        },
        type: Sequelize.INTEGER
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('order_products')
  }
}
