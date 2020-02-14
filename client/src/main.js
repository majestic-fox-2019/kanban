import Vue from 'vue';
import App from './App.vue';
import { BootstrapVue, IconsPlugin, ToastPlugin } from 'bootstrap-vue';
import firebase from 'firebase'

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

const firebaseConfig = require('./config/firebase')

firebase.initializeApp(firebaseConfig);

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(ToastPlugin)
Vue.use(firebase)

Vue.prototype.$socket = io.connect('http://localhost:3000')

new Vue({
  render: h => h(App),
}).$mount('#app');