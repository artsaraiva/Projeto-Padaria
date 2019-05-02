import Axios from 'axios'
import store from '@/store'
import router from '@/router'

export default () => {
  const axios = Axios.create({
    baseURL: `http://localhost:8081`,
    headers: {
      Authorization: `Bearer ${store.state.token}`
    }
  })

  axios.interceptors.response.use((response) => response, (error) => {
    if (error.response.status === 401) {
      alert('Sessão expirada')
      store.dispatch('setToken', null)
      store.dispatch('setUser', null)
      router.push({ name: 'login' })
    } else {
      return Promise.reject(error)
    }
  })

  return axios
}
