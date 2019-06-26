
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
      afterSave: (orderProduct, options) => {
        return require('../controllers/ProductController').updateStock(orderProduct)
      }
    }
  })

  OrderProduct.associate = function (models) {
    // associations can be defined here
  }

  return OrderProduct
}
