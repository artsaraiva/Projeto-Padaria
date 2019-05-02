
import Api from '@/services/Api'

export default {
  index () {
    return Api().get('products')
  },
  post (product) {
    return Api().post('products', product)
  },
  put (product) {
    return Api().put(`products/${product.id}`, product)
  },
  delete (product) {
    return Api().delete(`products/${product.id}`)
  }
}
