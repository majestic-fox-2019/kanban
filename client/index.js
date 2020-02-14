import Vue from 'vue';
import VueSwal from 'vue-swal'
import App from './App.vue';
import moment from 'moment';
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';
 
const socket = io('http://localhost:3000');
 
Vue.use(VueSocketIOExt, socket);

Vue.use(VueSwal);

Vue.filter('dateFormat', function(value) {
  if (value) {
    return moment(String(value)).format('DD MMMM YYYY, hh:mm')
  }
});

new Vue({ 
  el: "#app",
  render: createElement => createElement(App) 
})