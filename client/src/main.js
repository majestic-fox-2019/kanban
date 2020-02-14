import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueAlertify from 'vue-alertify'
import * as firebase from 'firebase/app'
import VueBootstrapTypeahead from 'vue-bootstrap-typeahead'

import 'firebase/auth'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueAlertify, {
  glossary: {
    // dialogs default title
    title: 'Hold up',
    // ok button text
    ok: 'OK',
    // cancel button text
    cancel: 'Cancel'
  },
  theme: {
    ok: 'btn btn-primary',
    cancel: 'btn btn-danger',
    input: 'form-control'
  }
})

// Global registration
Vue.component('vue-bootstrap-typeahead', VueBootstrapTypeahead)

// firebase
const firebaseConfig = require('../config/firebaseConfig')
firebase.initializeApp(firebaseConfig)

Vue.use(firebase)

Vue.prototype.$socket = io.connect('http://localhost:3000')

new Vue({
  render: (h) => h(App)
}).$mount('#app')
