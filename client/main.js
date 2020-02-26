import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


// firebase
import firebase from 'firebase'


const firebaseConfig = require('./firbaseConfigAuth')
firebase.initializeApp(firebaseConfig)




// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)
// firebase use
Vue.use(firebase)





new Vue({ render: createElement => createElement(App) })
  .$mount('#app')

