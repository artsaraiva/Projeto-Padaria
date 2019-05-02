
const isAuthenticated = require('./policies/isAuthenticated')

const UserController = require('./controllers/UserController')
const ProductController = require('./controllers/ProductController')

const UserControllerPolicy = require('./policies/UserControllerPolicy')
const ProductControllerPolicy = require('./policies/ProductControllerPolicy')

module.exports = function (app) {
  app.post('/login', UserController.login)

  app.get('/users', isAuthenticated, UserController.get)

  app.post('/users', isAuthenticated, UserControllerPolicy.post, UserController.post)

  app.put('/users/:id', isAuthenticated, UserControllerPolicy.put, UserController.put)

  app.delete('/users/:id', isAuthenticated, UserController.delete)

  app.get('/products', isAuthenticated, ProductController.get)

  app.post('/products', isAuthenticated, ProductControllerPolicy.post, ProductController.post)

  app.put('/products/:id', isAuthenticated, ProductControllerPolicy.put, ProductController.put)

  app.delete('/products/:id', isAuthenticated, ProductController.delete)
}
