
module.exports = (sequelize, DataTypes) =>
  sequelize.define('User', {
    name: DataTypes.STRING,
    login: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  })
