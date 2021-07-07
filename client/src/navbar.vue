<template>
  <div class="navbar">
 
    <div class="navbar-logo">
    <img src="../img/logo.png" alt="">

    </div>
    <div class="navbar-item">
      <h1>K A N B A N</h1>
      <p>make make your tasks more efficiently</p>
    </div>
    <div class="navbar-button">
      <button @click.prevent="logout" class="button">LOGOUT</button>
      <!-- <button class="register">REGISTER</button> -->

    </div>
  </div>
</template>
<script>
export default {
    methods:{
      logout(){
        Swal.fire(
          'Are You Sure?',
          'no more task need action',
          'question'
        ).then(result=>{
          this.$emit('logout')
            localStorage.clear()
        })
          
          
      }
    }
  
  }
</script>
<style scoped>

</style>