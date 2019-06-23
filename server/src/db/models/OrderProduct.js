
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('orderProduct', {
    amount: {
      type: DataTypes.INTEGER,
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
