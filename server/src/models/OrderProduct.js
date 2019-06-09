
module.exports = (sequelize, DataTypes) => {
  return sequelize.define('order_product', {
    amount: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    value: {
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  })
}
