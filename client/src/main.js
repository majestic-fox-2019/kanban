import Vue from  "vue";
import App from  "./App.vue"  


new Vue({
  render: ele => ele(App)
}).$mount('#app')