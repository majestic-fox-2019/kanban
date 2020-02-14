import Vue from 'vue';
import App from './App.vue';
import mixin from './config/mixin'
import VAnimateCss from 'v-animate-css';
import GAuth from 'vue-google-oauth2'
import dotenv from 'dotenv'
import * as firebase from "firebase"

const gauthOption = {
    clientId: '674753587254-dk8r6hh57petl05ldgeljnk83vtmlug8.apps.googleusercontent.com',
    scope: 'profile email',
    prompt: 'select_account'
}

dotenv.config()
Vue.use(GAuth, gauthOption)
const firebaseConfig = require("../src/firebase/config")
firebase.initializeApp(firebaseConfig)
Vue.use(firebase)
Vue.prototype.$socket = io("https://my-kanban-cool.herokuapp.com")
Vue.use(VAnimateCss);
new Vue({
    render: h => h(App),
    mixins: [mixin]
}).$mount('#app');