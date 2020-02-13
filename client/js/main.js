import Vue from "vue";
import App from '../components/App.vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import '../css/main.css';

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)


let kanban = new Vue({
    el: ".app",
    render: h => h(App)
});
