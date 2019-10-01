import Vue from 'vue'
import Router from 'vue-router'
import Countdown from '@/views/Countdown'
import Login from '@/views/Login'
import Register from '@/views/Register'

Vue.use(Router)

export default new Router({
  base: '/countdown',
  routes: [
    {
      path: '/',
      name: 'Countdown',
      component: Countdown
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    }
  ]
})
