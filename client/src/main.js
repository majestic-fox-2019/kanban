import Vue from 'vue'
import App from './App.vue'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import VueSweetalert2 from 'vue-sweetalert2'
import axios from 'axios'
import GSignInButton from 'vue-google-signin-button'
import SuiVue from 'semantic-ui-vue'
import firebase from 'firebase'

Vue.use(ElementUI)

import 'sweetalert2/dist/sweetalert2.min.css'
import 'semantic-ui-css/semantic.min.css'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

const firebaseConfig = require('./config/firebase')
import VModal from 'vue-js-modal'

Vue.use(VModal)

firebase.initializeApp(firebaseConfig)

Vue.use(VueSweetalert2)

Vue.use(SuiVue)
Vue.use(GSignInButton)
Vue.use(VueAxios, axios)
Vue.use(BootstrapVue)

Vue.use(IconsPlugin)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.prototype.$socket = io.connect('http://localhost:3000')

new Vue({
  render: h => h(App)
}).$mount('#app')
