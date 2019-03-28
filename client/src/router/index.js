
import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import Register from '@/components/Register'
import Login from '@/components/Login'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'register',
      component: Register,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        redirectWhenLogged: true
      }
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (!store.state.isUserLoggedIn) {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else if (to.matched.some(record => record.meta.redirectWhenLogged)) {
    next({
      path: from.fullPath
    })
  } else {
    next()
  }
})

export default router
