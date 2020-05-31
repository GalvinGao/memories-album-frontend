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
      title: "主页"
    }
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: About,
  //   meta: {
  //     icon: "mdi-information",
  //     title: "关于"
  //   }
  // },
  {
    path: '/person/:personId',
    name: 'PersonDetails',
    component: PersonDetails,
    props: true,
    meta: {
      icon: 'mdi-account-details',
      title: '详情'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
