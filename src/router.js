import Vue from 'vue' // Include Vue
import Router from 'vue-router' // Include Vue Router libary
import Home from './views/Home.vue' // <--- We'll look at these in a moment
import About from './views/About.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    }
  ]
})