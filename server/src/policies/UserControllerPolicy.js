
const Joi = require('joi')
const UserController = require('../controllers/UserController')

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

  async validate (body, skipUnique) {
    const schema = {
      name: Joi.string().max(200).required(),
      login: Joi.string().required().regex(
        new RegExp('^[a-zA-Z0-9]{2,16}$')
      ),
      email: Joi.string().max(200).required().email()
    }

    const value = {
      name: body.name,
      login: body.login,
      email: body.email
    }

    if (await UserController.changedPassword(body)) {
      schema.password = Joi.string().required().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}')
      )
      value.password = body.password
    }

    let msg = null

    const { error } = Joi.validate(value, schema)

    if (error) {
      switch (error.details[0].context.key) {
        case 'name':
          msg = 'É preciso informar um nome válido'
          break
        case 'login':
          msg = `O campo login deve seguir as seguintes regra:
                <br>
                1. Deve conter apenas os caracteres: maiúsculos, minúsculos, números;
                <br>
                2. Deve ter um tamanho entre 2 e 16 caracteres.`
          break
        case 'email':
          msg = 'É preciso informar um email válido'
          break
        case 'password':
          msg = `O campo senha deve seguir as seguintes regra:
                <br>
                1. Deve conter apenas os caracteres: maiúsculos, minúsculos, números;
                <br>
                2. Deve ter um tamanho entre 8 e 32 caracteres.`
          break
        default:
          msg = 'Informações inválidas'
          break
      }
    }

    if (!msg && !skipUnique) {
      msg = await UserController.checkUniqueLogin(body)
    }

    return msg
  }
}
