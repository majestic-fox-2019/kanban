import Vue from 'vue'
import Vuetify from 'vuetify'
import * as firebase from 'firebase/app'
import { mdiGithub } from '@mdi/js'
import 'firebase/auth'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import app from './App'
import key from './config/key'
import GSignInButton from 'vue-google-signin-button'

Vue.use(GSignInButton)

Vue.config.productionTip = false
Vue.use(Vuetify)

var firebaseConfig = {
  apiKey: key.firebaseAuth,
  authDomain: 'kanmarz-v2.firebaseapp.com',
  databaseURL: 'https://kanmarz-v2.firebaseio.com',
  projectId: 'kanmarz-v2',
  storageBucket: '',
  messagingSenderId: '',
  appId: ''
}

firebase.initializeApp(firebaseConfig)

Vue.prototype.$BASE_URL = 'http://localhost:3000'
Vue.prototype.$socket = io.connect('http://localhost:3000')

new Vue({
  el: '#app',
  firebase,
  vuetify: new Vuetify(),
  render: h => h(app)
})
