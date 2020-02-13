import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'
import app from './App'

Vue.config.productionTip = false
Vue.use(Vuetify)

Vue.prototype.$BASE_URL = 'http://localhost:3000'
Vue.prototype.$socket = io.connect('http://localhost:3000')

new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  render: h => h(app)
})
