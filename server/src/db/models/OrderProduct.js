
module.exports = (sequelize, DataTypes) => {
  const OrderProduct = sequelize.define('orderProduct', {
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    value: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    tableName: 'order_products',
    hooks: {
      afterBulkCreate: (orderProducts, options) => {
        return Promise.all(orderProducts.map(orderProduct => {
          require('../../controllers/ProductController').updateStock(orderProduct.get({ plain: true }))
        }))
      }
    }
  })

  OrderProduct.associate = function (models) {
    // associations can be defined here
  }

  return OrderProduct
}
