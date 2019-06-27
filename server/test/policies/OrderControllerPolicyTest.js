
const assert = require('chai').assert

const OrderControllerPolicy = require('../../src/policies/OrderControllerPolicy')

describe('Validação de Produto', function () {
  const order = {}

  beforeEach(function () {
    order.value = 100
    order.notes = ''
    order.products = [
      {
        id: 1,
        orderProduct: {
          amount: 1,
          value: 3.50
        }
      },
      {
        id: 2,
        orderProduct: {
          amount: 2,
          value: 4
        }
      }
    ]
  })

  async function validateOrder (valid) {
    const error = await OrderControllerPolicy.validate(order)

    if (valid) {
      if (error) {
        assert.fail(`Venda ${JSON.stringify(order)} inválida. Mensagem: ${error}`)
      }
    } else {
      if (!error) {
        assert.fail(`Venda ${JSON.stringify(order)} válida`)
      }
    }
  }

  it('validação de produtos', async function () {
    order.products = undefined
    await validateOrder(false)

    order.products = null
    await validateOrder(false)

    order.products = []
    await validateOrder(true)

    order.products = [
      {
        orderProduct: {
          amount: 1,
          value: 3.50
        }
      }
    ]
    await validateOrder(false)

    order.products = [
      {
        id: 0,
        orderProduct: {
          amount: 1,
          value: 3.50
        }
      }
    ]
    await validateOrder(false)
  })

  it('informações corretas', async function () {
    await validateOrder(true)
  })
})
