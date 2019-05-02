
function checkStock (product, options) {
  require('../controllers/ProductController').notifyStock(product)
}

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Product', {
    name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    code: {
      type: DataTypes.STRING(8),
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    type: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    minimum_quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    hooks: {
      afterSave: checkStock
    }
  })
}
