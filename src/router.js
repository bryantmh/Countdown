import Vue from 'vue'
import Router from 'vue-router'
import Countdown from '@/views/Countdown'

Vue.use(Router)

export default new Router({
  base: '/countdown',
  routes: [
    {
      path: '/',
      name: 'Countdown',
      component: Countdown
    }
  ]
})
