<template>
  <div>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between" id="navbar">
        <div>
          <a class="navbar-brand" href="#">
            Kanban
            <br>
            <small>Drag and drop</small>
          </a>
        </div>
        <div>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              
            </div>
          </div>
        </div>
        <div>
          <a class="navbar-brand" href="#">Welcome, {{value.name}}</a>
          <a class="navbar-brand btn btn-primary text-light" @click="logout">Logout</a>
        </div>
      </nav>
  </div>
</template>
<script>
import {Swal,Toast} from '../apis/sweetalert' 
export default {
  props:['value','islogin'],
  methods:{
    logout(){
      localStorage.clear()
      this.islogin.name =  null
      this.islogin.token = null
      this.$emit('showmain',false)
      Toast.fire({
        icon: 'success',
        title: 'Logout successfull'
      })
    },
  }
}
</script>
<style>

</style>