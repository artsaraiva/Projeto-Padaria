
const Router = require('express').Router()

const UserController = require('../controllers/UserController')
const UserControllerPolicy = require('../policies/UserControllerPolicy')

Router.route('/')
  .get(UserController.get)
  .post(UserControllerPolicy.post, UserController.post)

Router.route('/:id')
  .put(UserControllerPolicy.put, UserController.put)
  .delete(UserController.delete)

module.exports = Router
