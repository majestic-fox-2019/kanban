import Vue from 'vue';
import App from './App.vue';
import axios from 'axios';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import GAuth from 'vue-google-oauth2'


const gauthOption = {
    clientId: '121908459886-c92332hclj47ql4u9omqioujfb39ng6u.apps.googleusercontent.com',
    scope: 'profile email',
    prompt: 'select_account'
}
Vue.use(GAuth, gauthOption)

Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);

Vue.prototype.$axios = axios;
Vue.prototype.$socket = io("http://localhost:3000")

new Vue({
    render: (h) => h(App)
}).$mount('#app');