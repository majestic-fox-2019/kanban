import Vue from 'vue'
import App from './App.vue'
import gauth from 'vue-google-oauth2'

const gauthOption = {
    clientId: '498306790294-4con8ic54gfkskd0tghqo56kicrhpuoe.apps.googleusercontent.com',
    scope: 'profile email',
    prompt: 'select_account'
}
Vue.use(gauth, gauthOption)

new Vue({
    el: '#app',
    render: createElement => createElement(App),
})