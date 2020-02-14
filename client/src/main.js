import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import Swal from 'sweetalert2';

Vue.config.productionTip = false;
Vue.prototype.$SERVER_URL = "http://localhost:3000";
Vue.prototype.$axios = axios;
Vue.prototype.$Swal = Swal;
// eslint-disable-next-line
Vue.prototype.$socket = io.connect("http://localhost:3000");

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
