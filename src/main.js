import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import store from './store'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.prototype.judgmentSort = /^([1-9]\d|\d)$/;
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
