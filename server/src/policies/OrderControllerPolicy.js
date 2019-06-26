
const Joi = require('@hapi/joi')
const ProductController = require('../controllers/ProductController')

async function doValidate (body) {
  const schema = {
    value: Joi.number().required(),
    notes: Joi.string().allow(''),
    products: Joi.array().required().items(Joi.object({
      id: Joi.number().integer().required(),
      orderProduct: Joi.object({
        amount: Joi.number().integer().required().min(1),
        value: Joi.number().required()
      }).required()
    }))
  }

  const value = {
    value: body.value,
    notes: body.notes,
    products: body.products
  }

  let msg = null

  const { error } = Joi.validate(value, schema)

  if (error) {
    console.log(error)
    switch (error.details[0].context.key) {
      case 'value':
        msg = 'Campo valor está inválido'
        break
      case 'notes':
        msg = 'Campo observações está inválido'
        break
      case 'products':
        msg = 'Pelo menos um produto está inválido'
        break
      default:
        msg = 'Informações inválidas'
        break
    }
  }

  if (!msg) {
    const invalid = await ProductController.getInvalidProducts(body.products.map(product => {
      return product.id
    }))

    if (typeof invalid === 'string') {
      msg = invalid
    } else if (invalid.length !== 0) {
      msg = `O(s) seguinte(s) produto(s) não existe(m): ${invalid}`
    }
  }

  return msg
}

module.exports = {
  async post (req, res, next) {
    const error = await doValidate(req.body)

    if (error) {
      res.status(400).send({
        error: error
      })
    } else {
      next()
    }
  },

  async put (req, res, next) {
    const error = await doValidate(req.body)

    if (error) {
      res.status(400).send({
        error: error
      })
    } else {
      next()
    }
  },

  async validate (body) {
    return doValidate(body)
  }
}
