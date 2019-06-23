
const bcrypt = require('bcrypt')

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    login: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    tableName: 'users',
    hooks: {
      beforeSave: (user, options) => {
        const SALT_FACTOR = 10

        if (!user.changed('password')) {
          return
        }

        return bcrypt.hash(user.password, SALT_FACTOR).then(function (hash) {
          user.setDataValue('password', hash)
        })
      }
    }
  })

  User.prototype.comparePassword = function (password) {
    return bcrypt.compare(password, this.password)
  }

  User.associate = function (models) {
    // associations can be defined here
  }

  return User
}
