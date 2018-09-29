import Vue from 'vue'
import Router from 'vue-router'

const login = resolve=>System.import('@/components/login')
const index = resolve=>System.import('@/components/index')
const home = resolve=>System.import('@/components/home')
const control = resolve=>System.import('@/components/control')
const detailed = resolve=>System.import('@/components/detailed')


Vue.use(Router)

export default new Router({
  routes: [
  {
    path: '/login',
    component: login,
  },
  {
    path: '/index',
    component: index,
    children:[
    { path: '/home', component: home},
    { path: '/control', component: control},
    { path: '/detailed', component: detailed}
    ]
  }
  ]
})
