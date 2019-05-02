
const { User } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config')
const Op = require('../models').Sequelize.Op

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

  async get (req, res) {
    try {
      const users = await User.findAll({
        where: {}
      })
      res.send(users)
    } catch (error) {
      res.status(500).send({
        error: 'não foi possivel obter lista de usuários'
      })
    }
  },

  async post (req, res) {
    try {
      const user = await User.create(req.body)
      res.send(user.toJSON())
    } catch (error) {
      res.status(500).send({
        error: 'não foi possivel adicionar usuário'
      })
    }
  },

  async put (req, res) {
    try {
      const user = await User.findOne({
        where: {
          id: req.params.id
        }
      })

      if (!user) {
        return res.status(404).send({
          error: 'não existe registro com esse id'
        })
      }

      await user.update(req.body)
      res.send(user.toJSON())
    } catch (error) {
      res.status(500).send({
        error: 'não foi possivel atualizar usuário'
      })
    }
  },

  async delete (req, res) {
    try {
      const user = await User.findOne({
        where: {
          id: req.params.id
        }
      })

      if (!user) {
        return res.status(404).send({
          error: 'não existe registro com esse id'
        })
      }

      await user.destroy()
      res.send(user)
    } catch (error) {
      res.status(500).send({
        error: 'não foi possivel excluir usuário'
      })
    }
  },

  async checkUniqueLogin (user) {
    let msg = null

    try {
      const users = await User.findAll({
        where: {}
      })
      if (users.find((item) => item.id !== user.id && item.login === user.login)) {
        msg = 'Esse login já está em uso'
      }
      if (users.find((item) => item.id !== user.id && item.email === user.email)) {
        msg = 'Esse email já está em uso'
      }
    } catch (error) {
      msg = 'erro ao tentar salvar usuário'
    }

    return msg
  },

  async changedPassword (user) {
    let found = null

    if (user.id) {
      found = await User.findOne({
        where: {
          id: user.id
        }
      })
    }

    return !found || found.password !== user.password
  }
}
