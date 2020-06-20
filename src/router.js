import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import PersonDetails from "@/views/PersonDetails";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      icon: "mdi-home",
      title: "home"
    }
  },
  {
    path: '/person/:personId',
    name: 'PersonDetails',
    component: PersonDetails,
    props: true,
    meta: {
      icon: 'mdi-account-details',
      title: 'details',
      hide: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  scrollBehavior() { // params: (to, from, savedPosition)
    return { x: 0, y: 0 }
  },
  base: process.env.BASE_URL,
  routes
})

export default router
