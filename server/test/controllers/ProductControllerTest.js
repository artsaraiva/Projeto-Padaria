
const assert = require('chai').assert

const ProductController = require('../../src/controllers/ProductController')

describe('ProductController', function () {
  const product = {}

  async function validateStock (valid) {
    const sendMail = await ProductController.checkStock(product)

    if (valid) {
      if (!sendMail) {
        assert.fail(`Produto ${JSON.stringify(product)} não notificará falta de estoque.`)
      }
    } else {
      if (sendMail) {
        assert.fail(`Produto ${JSON.stringify(product)} notificará falta de estoque.`)
      }
    }
  }

  it('checkStock', function () {
    product.minimum_quantity = -1
    product.quantity = 1
    validateStock(false)

    product.minimum_quantity = -1
    product.quantity = -1
    validateStock(false)

    product.minimum_quantity = -1
    product.quantity = -2
    validateStock(false)

    product.minimum_quantity = 0
    product.quantity = 1
    validateStock(false)

    product.minimum_quantity = 0
    product.quantity = 0
    validateStock(true)

    product.minimum_quantity = 0
    product.quantity = -1
    validateStock(true)
  })
})
