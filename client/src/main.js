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

Vue.prototype.$socket = io.connect('https://kanban-v2.herokuapp.com')

new Vue({
  render: h => h(App),
}).$mount('#app');