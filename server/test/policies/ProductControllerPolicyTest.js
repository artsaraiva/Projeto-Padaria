
const assert = require('chai').assert

const ProductControllerPolicy = require('../../src/policies/ProductControllerPolicy')

describe('Validação de Produto', function () {
  const product = {}

  beforeEach(function () {
    product.name = 'Farinha'
    product.code = 'I-001'
    product.price = 2.50
    product.type = 'Ingrediente'
    product.quantity = 50,
    product.minimum_quantity = 10
  })

  async function validateProduct (valid) {
    const error = await ProductControllerPolicy.validate(product)

    if (valid) {
      if (error) {
        assert.fail(`Produto ${JSON.stringify(product)} inválido. Mensagem: ${error}`)
      }
    } else {
      if (!error) {
        assert.fail(`Produto ${JSON.stringify(product)} válido`)
      }
    }
  }

  it('validação do nome', async function () {
    product.name = undefined
    await validateProduct(false)

    product.name = null
    await validateProduct(false)

    product.name = ''
    await validateProduct(false)

    product.name = '200 caracteres .........................................................................................................................................................................................'
    await validateProduct(true)

    product.name = '201 caracteres ..........................................................................................................................................................................................'
    await validateProduct(false)
  })

  it('validação do código', async function () {
    product.code = undefined
    await validateProduct(false)

    product.code = null
    await validateProduct(false)

    product.code = ''
    await validateProduct(false)

    product.code = '8caracte'
    await validateProduct(true)

    product.code = '9caracter'
    await validateProduct(false)
  })

  it('validação do preço', async function () {
    product.price = undefined
    await validateProduct(false)

    product.price = null
    await validateProduct(false)

    product.price = 'string'
    await validateProduct(false)

    product.price = '0'
    await validateProduct(true)

    product.price = 0
    await validateProduct(true)

    product.price = -1
    await validateProduct(false)
  })

  it('validação do tipo', async function () {
    product.type = undefined
    await validateProduct(false)

    product.type = null
    await validateProduct(false)

    product.type = ''
    await validateProduct(false)

    product.type = '50 caracteres ....................................'
    await validateProduct(true)

    product.type = '51 caracteres .....................................'
    await validateProduct(false)
  })

  it('validação da quantidade', async function () {
    product.quantity = undefined
    await validateProduct(false)

    product.quantity = null
    await validateProduct(false)

    product.quantity = 'string'
    await validateProduct(false)

    product.quantity = '0'
    await validateProduct(true)

    product.quantity = -50
    await validateProduct(true)

    product.quantity = 50
    await validateProduct(true)

    product.quantity = 5.1
    await validateProduct(false)
  })

  it('validação da quantidade mínima', async function () {
    product.minimum_quantity = undefined
    await validateProduct(false)

    product.minimum_quantity = null
    await validateProduct(false)

    product.minimum_quantity = 'string'
    await validateProduct(false)

    product.minimum_quantity = '0'
    await validateProduct(true)

    product.minimum_quantity = -2
    await validateProduct(false)

    product.minimum_quantity = -1
    await validateProduct(true)

    product.minimum_quantity = 5
    await validateProduct(true)

    product.minimum_quantity = 0.5
    await validateProduct(false)
  })

  it('informações corretas', async function () {
    await validateProduct(true)
  })
})