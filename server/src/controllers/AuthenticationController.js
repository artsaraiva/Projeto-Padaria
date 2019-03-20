
const { User } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async register (req, res) {
    try {
      const user = User.create(req.body)
      res.send(user.toJSON())
    } catch (err) {
      Response.status(400).send({
        error: 'login in use'
      })
    }
  },
  async login (req, res) {
    try {
      const { login, password } = req.body
      const user = await User.findOne({
        where: {
          login: login
        }
      })

      if (!user) {
        return res.status(403).send({
          error: 'Login ou senha incorretos'
        })
      }

      const isPasswordValid = await user.comparePassword(password)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: 'Login ou senha incorretos'
        })
      }

      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(500).send({
        error: 'Erro ao tentar logar'
      })
    }
  }
}
