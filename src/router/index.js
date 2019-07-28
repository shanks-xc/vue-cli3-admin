import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/* Router Modules */
import accountRouter from '@/router/modules/account'
import certificationRouter from '@/router/modules/certification'
export const constantRoutes = [
  // 404 page must be placed at the end !!!
  accountRouter,
  certificationRouter,
  {
    path: '/',
    redirect: '/account/index'
  },
  {
    path: '*',
    redirect: '/404'
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

// 暴露路由
export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  // to, from, savedPosition
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    }
  },
  routes: constantRoutes
})
