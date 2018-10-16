import Vue from 'vue'
import Router from 'vue-router'

const login = resolve=>require(['@/components/login'],resolve)
const index = resolve=>require(['@/components/index'],resolve)
const home = resolve=>require(['@/components/home'],resolve)
const control = resolve=>require(['@/components/control'],resolve)
const detailed = resolve=>require(['@/components/detailed'],resolve)
const content = resolve=>require(['@/components/content'],resolve)


Vue.use(Router)

const router = new Router({
  mode:"history",
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
    { path: '/detailed', component: detailed},
    { path: '/content', component: content}
    ]
  }
  ]
})

export default router;