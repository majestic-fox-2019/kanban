import Vue from "vue"
import App from "./App.vue"
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';
 
const socket = io('http://localhost:3000');
 
Vue.use(VueSocketIOExt, socket);
new Vue ({
  render: h => h(App)
}).$mount("#app")