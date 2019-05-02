
const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))

function hashPassword (user, options) {
  const SALT_FACTOR = 8

  if (!user.changed('password')) {
    return
  }

  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password, salt, null))
    .then(hash => {
      user.setDataValue('password', hash)
    })
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    login: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    indexes: [{
      unique: true,
      fields: ['login']
    }, {
      unique: true,
      fields: ['email']
    }],
    hooks: {
      beforeSave: hashPassword
    }
  })

  User.prototype.comparePassword = function (password) {
    return bcrypt.compareAsync(password, this.password)
  }

  User.associate = function (models) {
  }

  return User
}
