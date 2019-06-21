
const assert = require('chai').assert

const UserControllerPolicy = require('../../src/policies/UserControllerPolicy')

describe('Validação de Usuário', function () {
  const user = {}

  beforeEach(function () {
    user.name = 'admin'
    user.login = 'admin'
    user.email = 'admin@admin.com'
    user.password = 'adminadmin'
  })

  async function validateUser (valid) {
    const error = await UserControllerPolicy.validate(user, true)

    if (valid) {
      if (error) {
        assert.fail(`Usuário ${JSON.stringify(user)} inválido. Mensagem: ${error}`)
      }
    } else {
      if (!error) {
        assert.fail(`Usuário ${JSON.stringify(user)} válido`)
      }
    }
  }

  it('validação do nome', async function () {
    user.name = undefined
    await validateUser(false)

    user.name = null
    await validateUser(false)

    user.name = ''
    await validateUser(false)

    user.name = '200 caracteres .........................................................................................................................................................................................'
    await validateUser(true)

    user.name = '201 caracteres ..........................................................................................................................................................................................'
    await validateUser(false)
  })

  it('validação do login', async function() {
    user.login = undefined
    await validateUser(false)

    user.login = null
    await validateUser(false)

    user.login = ''
    await validateUser(false)

    user.login = '1'
    await validateUser(false)

    user.login = '2C'
    await validateUser(true)

    user.login = '016caracteres016'
    await validateUser(true)

    user.login = 'esp aco'
    await validateUser(false)

    user.login = 'ácento'
    await validateUser(false)
  })

  it('validação do email', async function() {
    user.email = undefined
    await validateUser(false)

    user.email = null
    await validateUser(false)

    user.email = ''
    await validateUser(false)

    user.email = 'teste'
    await validateUser(false)

    user.email = 'esp aco@teste.com'
    await validateUser(false)

    user.email = 'teste@numero.123'
    await validateUser(false)

    user.email = 'teste@teste&12'
    await validateUser(false)

    user.email = 'semdominio@'
    await validateUser(false)

    user.email = 'um@dominio'
    await validateUser(false)
  })

  it('validação da senha', async function() {
    user.password = undefined
    await validateUser(false)

    user.password = null
    await validateUser(false)

    user.password = ''
    await validateUser(false)

    user.password = '1'
    await validateUser(false)

    user.password = '8Caracte'
    await validateUser(true)

    user.password = '032caracteres032032caracteres032'
    await validateUser(true)

    user.password = 'esp aco'
    await validateUser(false)

    user.password = 'ácento'
    await validateUser(false)
  })

  it('informações corretas', async function () {
    await validateUser(true)
  })
})
