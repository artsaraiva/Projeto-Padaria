
const { User } = require('../db/models')
const Op = require('../db/models').Sequelize.Op

module.exports = {
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

      res.send(user)
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
      res.send(user)
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
      const other = await User.findOne({
        where: {
          [Op.or]: [{ login: user.login }, { email: user.email }],
          id: {
            [Op.ne]: user.id ? user.id : null
          }
        }
      })

      if (other) {
        if (other.email === user.email) {
          msg = 'Esse email já está em uso'
        }

        if (other.login === user.login) {
          msg = 'Esse login já está em uso'
        }
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
