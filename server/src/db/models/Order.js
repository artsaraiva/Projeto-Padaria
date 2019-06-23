
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('order', {
    value: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    notes: {
      allowNull: false,
      defaultValue: '',
      type: DataTypes.TEXT
    }
  }, {
    tableName: 'orders'
  })

  Order.associate = (models) => {
    Order.belongsTo(models.User, { foreignKey: { allowNull: false }, onDelete: 'CASCADE' })
    Order.belongsToMany(models.Product, { through: models.OrderProduct })
  }

  return Order
}
