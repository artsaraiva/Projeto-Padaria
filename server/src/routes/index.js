
const AuthenticationController = require('../controllers/AuthenticationController')

module.exports = function (app) {
  app.use('/login', AuthenticationController.login)
  app.use(AuthenticationController.isAuthenticated)

  app.use('/users', require('./users'))
  app.use('/products', require('./products'))
  app.use('/orders', require('./orders'))
}
