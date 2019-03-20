
const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      name: Joi.string(),
      login: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{2,16}')
      ),
      password: Joi.string().regex(
        new RegExp('^[a-zA-Z0-9]{8,32}')
      )
    }

    const { error } = Joi.validate(req.body, schema)

    if (error) {
      var msg = ''

      switch (error.details[0].context.key) {
        case 'name':
          msg = 'É preciso informar um nome'
          break
        case 'login':
          msg = `O campo login deve seguir as seguintes regra:
                <br>
                1. Deve conter apenas os caracteres: maiúsculos, minúsculos, números
                <br>
                2. Deve ter um tamanho entre 2 e 16 caracteres`
          break
        case 'password':
          msg = `O campo senha deve seguir as seguintes regra:
                <br>
                1. Deve conter apenas os caracteres: maiúsculos, minúsculos, números
                <br>
                2. Deve ter um tamanho entre 8 e 32 caracteres`
          break
        default:
          msg = 'Informações inválidas'
          break
      }

      res.status(400).send({
        error: msg
      })
    } else {
      next()
    }
  }
}
