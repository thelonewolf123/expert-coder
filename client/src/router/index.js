import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/About.vue')
  },
  {
    path: '/courses',
    name: 'Courses',
    component: () => import('../views/Courses.vue')
  },
  {
    path: '/code/:id',
    name: 'Code',
    component: () => import('../views/Code.vue')
  },
  {
    path: '/videos',
    name: 'VideoList',
    component: () => import('../components/VideoList.vue')
  },
  {
    path: '/video/:id',
    name: 'VideoPlayer',
    component: () => import('../components/VideoPlayer.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
