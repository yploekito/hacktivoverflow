import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import bootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '../public/style.css'
Vue.config.productionTip = false
Vue.use(bootstrapVue)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
