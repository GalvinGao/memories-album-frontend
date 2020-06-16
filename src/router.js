import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import PersonDetails from "@/views/PersonDetails";
import About from "@/views/About";
import Videos from "@/views/Videos";

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
  {
    path: '/videos',
    name: 'Videos',
    component: Videos,
    meta: {
      icon: 'mdi-file-video',
      title: '纪念视频',
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      icon: "mdi-information",
      title: "关于开发者"
    }
  },
  {
    path: '/person/:personId',
    name: 'PersonDetails',
    component: PersonDetails,
    props: true,
    meta: {
      icon: 'mdi-account-details',
      title: '详情',
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
