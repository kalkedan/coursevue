import Vue from 'vue' // Include Vue
import Router from 'vue-router' // Include Vue Router libary
import Home from './views/Home.vue' // <--- We'll look at these in a moment
import CoursesList from './views/CoursesList.vue'
import Advisors from './views/Advisors.vue'
import Login from './views/Login.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/courses',
      name: 'courses',
      component: CoursesList
    },
    {
      path: '/advisors',
      name: 'advisors',
      component: Advisors
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})