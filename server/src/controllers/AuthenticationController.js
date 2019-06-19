
const passport = require('passport')
const { User } = require('../models')
const Op = require('../models').Sequelize.Op
const jwt = require('jsonwebtoken')
const config = require('../config')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7

  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async login (req, res) {
    try {
      const { login, password } = req.body
      const user = await User.findOne({
        where: {
          [Op.or]: [{ login: login }, { email: login }]
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
    } catch (error) {
      res.status(500).send({
        error: 'erro ao tentar logar'
      })
    }
  },

  isAuthenticated: (req, res, next) => {
    passport.authenticate('jwt', (err, user) => {
      if (err || !user) {
        res.status(401).send({
          error: 'usuário não está logado'
        })
      } else {
        req.user = user
        next()
      }
    })(req, res, next)
  }
}
