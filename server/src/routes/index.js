
const AuthenticationController = require('../controllers/AuthenticationController')

module.exports = function (app) {
  app.use('/api/login', AuthenticationController.login)
  app.use('/api', AuthenticationController.isAuthenticated)

  app.use('/api/users', require('./users'))
  app.use('/api/products', require('./products'))
  app.use('/api/orders', require('./orders'))
}
