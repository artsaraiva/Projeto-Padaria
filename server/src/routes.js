
const UserController = require('./controllers/UserController')

const UserControllerPolicy = require('./policies/UserControllerPolicy')

module.exports = function (app) {
  app.post('/login', UserController.login)

  app.get('/users', UserController.get)

  app.post('/users', UserControllerPolicy.post, UserController.post)

  app.put('/users/:id', UserControllerPolicy.put, UserController.put)

  app.delete('/users/:id', UserController.delete)
}
