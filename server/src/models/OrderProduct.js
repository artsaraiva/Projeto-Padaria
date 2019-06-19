
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('OrderProduct', {
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    value: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    tableName: 'order_products'
  })
}
