import Vue from 'vue';
import App from './App.vue';
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';

const socket = io('https://learnkanban.herokuapp.com');

Vue.use(VueSocketIOExt, socket);

new Vue({
  render: h => h(App),
}).$mount('#app');

