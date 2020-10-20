import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/welcome/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/routines',
    name: 'Routines',
    component: () => import('../views/routines/Routines.vue')
  },
  {
    path: '/favourites',
    name: 'Favourites',
    component: () => import('../views/Favourites.vue')
  },
  {
    path: '/exercises',
    name: 'Exercises',
    component: () => import('../views/exercises/Exercises.vue')
  },
  {
    path: '/inprogress',
    name: 'InProgress',
    component: () => import('../views/InProgress.vue')
  },
  {
    path: '/aboutus',
    name: 'AboutUs',
    component: () => import('../views/AboutUs.vue')
  },
  {
    path: '/main',
    name: 'Main',
    component: () => import('../views/Main.vue')
  },
  {
    path: '/editprofile',
    name: 'EditProfile',
    component: () => import('../views/EditProfile.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
