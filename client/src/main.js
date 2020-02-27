
import Vue from 'vue';
import App from './App.vue';
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'
require('dotenv').config()
const options = {
    confirmButtonColor: '#41b882',
    cancelButtonColor: '#ff7674',
};
Vue.use(VueSweetalert2, options);
import GAuth from 'vue-google-oauth2'
const gauthOption = {
  clientId: `255521937375-dkbj7vrcopqel2nbdf0hkb4u5d8qc2sr.apps.googleusercontent.com`,
  scope: 'profile email',
  prompt: 'select_account'
}

Vue.use(GAuth, gauthOption)

new Vue({ render: createElement => createElement(App) }).$mount('#app');