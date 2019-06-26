
function checkStock (product, options) {
  require('../controllers/ProductController').notifyStock(product)
}

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    code: {
      type: DataTypes.STRING(8),
      allowNull: false
    },
    price: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
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
      defaultValue: -1
    }
  }, {
    tableName: 'products',
    hooks: {
      afterSave: checkStock
    }
  })

  Product.associate = (models) => {
    Product.belongsToMany(models.Order, { through: models.OrderProduct })
  }

  return Product
}
