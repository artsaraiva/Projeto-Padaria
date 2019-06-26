
import Api from '@/services/Api'

export default {
  index () {
    return Api().get('orders')
  },
  post (order) {
    return Api().post('orders', order)
  },
  put (order) {
    return Api().put(`orders/${order.id}`, order)
  },
  delete (order) {
    return Api().delete(`orders/${order.id}`)
  }
}
