
const Joi = require('joi')



module.exports = {
  async post (req, res, next) {
    const error = await this.validate(req.body)

    if (error) {
      res.status(400).send({
        error: error
      })
    } else {
      next()
    }
  },

  async put (req, res, next) {
    const error = await this.validate(req.body)

    if (error) {
      res.status(400).send({
        error: error
      })
    } else {
      next()
    }
  },

  async validate (body) {
    const schema = {
      name: Joi.string().required().max(200),
      code: Joi.string().required().max(8),
      price: Joi.number().required().min(0),
      type: Joi.string().required().max(50),
      quantity: Joi.number().required().integer(),
      minimum_quantity: Joi.number().required().integer().min(-1)
    }

    const value = {
      name: body.name,
      code: body.code,
      price: body.price,
      type: body.type,
      quantity: body.quantity,
      minimum_quantity: body.minimum_quantity
    }

    let msg = null

    const { error } = Joi.validate(value, schema)

    if (error) {
      switch (error.details[0].context.key) {
        case 'name':
          msg = 'Campo nome está inválido'
          break
        case 'code':
          msg = 'Campo código está inválido'
          break
        case 'price':
          msg = 'Campo preço está inválido'
          break
        case 'type':
          msg = 'Campo estoque atual está inválido'
          break
        case 'minimum_quantity':
          msg = 'Campo de quantidade mínima em estoque está inválido'
          break
        default:
          msg = 'Informações inválidas'
          break
      }
    }

    return msg
  }
}
