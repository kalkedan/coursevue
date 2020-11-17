import Vue from 'vue' // Include Vue
import Router from 'vue-router' // Include Vue Router libary
import Home from './views/Home.vue' // <--- We'll look at these in a moment
import About from './views/About.vue'
import CoursesList from './views/CoursesList.vue'
import Advisors from './views/Advisors.vue'
import Students from './views/Students.vue'
import Student from './views/Student.vue'
import StudentCourses from './views/StudentCourses.vue'
import Login from './views/Login.vue'
import Logout from './views/Logout.vue'

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
      path: '/students',
      name: 'students',
      component: Students
    },
    {
      path: '/student',
      name: 'student',
      component: Student
    },
    {
      path: '/StudentCourses',
      name: 'StudentCourses',
      component: StudentCourses
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    }
  ]
})