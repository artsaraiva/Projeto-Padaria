
import Api from '@/services/Api'

export default {
  login (credentials) {
    return Api().post('login', credentials)
  },
  index () {
    return Api().get('users')
  },
  post (user) {
    return Api().post('users', user)
  },
  put (user) {
    return Api().put(`users/${user.id}`, user)
  },
  delete (user) {
    return Api().delete(`users/${user.id}`)
  }
}
