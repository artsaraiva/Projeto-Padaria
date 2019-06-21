
const Router = require('express').Router()

const OrderController = require('../controllers/OrderController')
const OrderControllerPolicy = require('../policies/OrderControllerPolicy')

Router.route('/')
  .get(OrderController.get)
  .post(OrderControllerPolicy.post, OrderController.post)

Router.route('/:id')
  .put(OrderControllerPolicy.put, OrderController.put)
  .delete(OrderController.delete)

module.exports = Router
