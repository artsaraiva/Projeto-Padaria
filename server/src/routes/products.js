
const Router = require('express').Router()

const ProductController = require('../controllers/ProductController')
const ProductControllerPolicy = require('../policies/ProductControllerPolicy')

Router.route('/')
  .get(ProductController.get)
  .post(ProductControllerPolicy.post, ProductController.post)

Router.route('/:id')
  .put(ProductControllerPolicy.put, ProductController.put)
  .delete(ProductController.delete)

module.exports = Router
