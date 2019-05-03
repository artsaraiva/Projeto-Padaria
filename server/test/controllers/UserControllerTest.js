
const assert = require('chai').assert

const UserController = require('../../src/controllers/UserController')
const { User } = require('../../src/models')

describe('UserController', function () {
  let dbUser = null
  let user = null

  before(async function () {
    const users = await User.findAll({
      where: {}
    })
    if (users.length) {
      dbUser = users[0]
    }
  })

  async function validateUnique (valid) {
    const message = await UserController.checkUniqueLogin(user)

    if (valid) {
      if (message) {
        assert.fail(`Usuário ${JSON.stringify(user)} não é único. Mensagem: ${message}`)
      }
    } else {
      if (!message) {
        assert.fail(`Usuário ${JSON.stringify(user)} é único, mas possui os mesmos dados do que ${dbUser.toJSON()}`)
      }
    }
  }

  it('check unique login and email', async function () {
    if (dbUser) {
      user = dbUser
      await validateUnique(true)

      user = {
        login: dbUser.login,
        email: dbUser.email
      }
      await validateUnique(false)

      user = {
        login: dbUser.login,
        email: ''
      }
      await validateUnique(false)

      user = {
        login: '',
        email: dbUser.email
      }
      await validateUnique(false)

      user = {
        login: '',
        email: ''
      }
      await validateUnique(true)
    }
  })
})