
const { Product } = require('../db/models')
const Op = require('../db/models').Sequelize.Op
const Mail = require('../mail')

module.exports = {
  async get (req, res) {
    try {
      const products = await Product.findAll({
        where: {}
      })
      res.send(products)
    } catch (error) {
      res.status(500).send({
        error: 'não foi possivel obter lista de produtos'
      })
    }
  },

  async post (req, res) {
    try {
      const product = await Product.create(req.body)
      res.send(product)
    } catch (error) {
      console.log(error)
      res.status(500).send({
        error: 'não foi possivel adicionar produto'
      })
    }
  },

  async put (req, res) {
    try {
      const product = await Product.findOne({
        where: {
          id: req.params.id
        }
      })

      if (!product) {
        return res.status(404).send({
          error: 'não existe registro com esse id'
        })
      }

      await product.update(req.body)
      res.send(product)
    } catch (error) {
      res.status(500).send({
        error: 'não foi possivel atualizar produto'
      })
    }
  },

  async delete (req, res) {
    try {
      const product = await Product.findOne({
        where: {
          id: req.params.id
        }
      })

      if (!product) {
        return res.status(404).send({
          error: 'não existe registro com esse id'
        })
      }

      await product.destroy()
      res.send(product)
    } catch (error) {
      res.status(500).send({
        error: 'não foi possivel excluir produto'
      })
    }
  },

  async updateStock (orderProduct) {
    const product = await Product.findOne({
      where: {
        id: orderProduct.productId
      }
    })

    await product.update({
      quantity: product.quantity - orderProduct.amount
    })
  },

  notifyStock (product) {
    if (this.checkStock(product)) {
      Mail.sendHTMLMail(null, 'Notificação de Estoque', 'minimumquantity', {
        name: product.name,
        code: product.code,
        price: product.price,
        type: product.type,
        quantity: product.quantity
      })
    }
  },

  checkStock (product) {
    return product.minimum_quantity !== -1 && product.quantity <= product.minimum_quantity
  },

  async getInvalidProducts (ids) {
    try {
      const query = await Product.findAll({
        attributes: ['id'],
        where: {
          id: {
            [Op.in]: ids
          }
        }
      })

      const valid = query.map(result => result.id)

      return ids.filter(id => valid.indexOf(id) === -1)
    } catch (error) {
      return 'não foi possivel verificar os produtos'
    }
  }
}
