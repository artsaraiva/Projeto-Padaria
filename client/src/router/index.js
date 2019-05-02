
import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'

import Login from '@/components/Login'
import Sales from '@/components/Sales'
import Users from '@/components/Users'
import Products from '@/components/Products'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        redirectWhenLogged: true
      }
    },
    {
      path: '/',
      name: 'sales',
      component: Sales,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/users',
      name: 'users',
      component: Users,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/products',
      name: 'products',
      component: Products,
      meta: {
        requiresAuth: true
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
