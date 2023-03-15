import Vue from 'vue'
import Router from 'vue-router'
import Store from '../store/index.js'

const login = resolve=>require(['@/components/login'],resolve)
const index = resolve=>require(['@/components/index'],resolve)
const home = resolve=>require(['@/components/home'],resolve)
const control = resolve=>require(['@/components/control'],resolve)
const detailed = resolve=>require(['@/components/detailed'],resolve)
const content = resolve=>require(['@/components/content'],resolve)
const cost_type = resolve=>require(['@/components/cost_type'],resolve)


Vue.use(Router)

const router = new Router({
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
    { path: '/content', component: content},
    { path: '/cost_type', component: cost_type},
    ]
  }
  ]
})

router.beforeEach((to, from, next) => {
  if(Store.state.only_read == '1' && (to.path != '/detailed' && to.path != '/content' && to.path != '/login')){
    next({
      path: '/detailed',
      query: {}
    })
  }else{
    next();
  }
});

export default router;