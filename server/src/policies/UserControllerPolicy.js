
const Joi = require('joi')
const UserController = require('../controllers/UserController')

async function validate (req, res, next) {
  const schema = {
    name: Joi.string(),
    login: Joi.string().regex(
      new RegExp('^[a-zA-Z0-9]{2,16}')
    )
  }

  const value = {
    name: req.body.name,
    login: req.body.login
  }

  if (await UserController.changedPassword(req.body)) {
    schema.password = Joi.string().regex(
      new RegExp('^[a-zA-Z0-9]{8,32}')
    )
    value.password = req.body.password
  }

  let msg = null

  const { error } = Joi.validate(value, schema)

  if (error) {
    switch (error.details[0].context.key) {
      case 'name':
        msg = 'É preciso informar um nome'
        break
      case 'login':
        msg = `O campo login deve seguir as seguintes regra:
              <br>
              1. Deve conter apenas os caracteres: maiúsculos, minúsculos, números;
              <br>
              2. Deve ter um tamanho entre 2 e 16 caracteres.`
        break
      case 'password':
        msg = `O campo senha deve seguir as seguintes regra:
              <br>
              1. Deve conter apenas os caracteres: maiúsculos, minúsculos, números;
              <br>
              2. Deve ter um tamanho entre 8 e 32 caracteres.`
        break
      default:
        console.log(error.details[0])
        msg = 'Informações inválidas'
        break
    }
  }

  if (!msg) {
    msg = await UserController.checkUniqueLogin(req.body)
  }

  if (msg) {
    res.status(400).send({
      error: msg
    })
  } else {
    next()
  }
}

module.exports = {
  post (req, res, next) {
    validate(req, res, next)
  },

  put (req, res, next) {
    validate(req, res, next)
  }
}
