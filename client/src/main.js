import Vue from 'vue'
import App from "./App.vue"
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import { NavbarPlugin } from 'bootstrap-vue'
import { ToastPlugin } from 'bootstrap-vue'
import { VBModal } from 'bootstrap-vue'
import { BCard } from 'bootstrap-vue'
import VueDraggable from 'vue-draggable'
import GSignInButton from "vue-google-signin-button";
// import VueSweetalert2 from 'vue-sweetalert2';


import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'sweetalert2/dist/sweetalert2.min.css';

// Vue.use(VueSweetalert2);
Vue.use(GSignInButton)
Vue.use(VueDraggable)
Vue.component('b-card', BCard)
Vue.directive('b-modal', VBModal)
Vue.use(NavbarPlugin)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(ToastPlugin)

new Vue({
    render: h => h(App)
}).$mount('#app')