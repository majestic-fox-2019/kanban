<template>
    <div v-show="formShowRegister">

    <div class="grid align__item">

    <div class="register">

      <h2>Kanbatte</h2>
      <h3>Sign Up</h3>

      <form v-on:submit.prevent = "register" method="POST">

        <div class="form__field">
          <input v-model = "formRegister.email" type="email" class="form-control" id="emailRegister" aria-describedby="emailHelp" placeholder="Enter email">
        </div>

        <div class="form__field">
          <input v-model = "formRegister.username" type="username" class="form-control" id="usernameRegister" aria-describedby="usernameHelp" placeholder="Enter username">
        </div>

        <div class="form_field">
            <input v-model = "formRegister.password" type="password" class="form-control" id="passwordRegister" placeholder="Enter Password">
        </div>
        <br>
        <div class="form__field">
          <input type="submit" value="Sign Up">
        </div>

      </form>

      <p>Already have an account? <a v-on:click="getLogin" style="cursor:pointer">Log in</a></p>

    </div>

  </div>
        </div>

</template>
<script>
export default {
    name:"formRegis",
    props:['formShowRegister'],
    data:function(){
        return{
            formRegister:{
                email:null,
                username:null,
                password:null
            }
        }
    },
    methods:{
        register:function(){
            let clear = function (){
                this.formRegister.email = null
                this.formRegister.username = null
                this.formRegister.password = null
            }

            this.$emit('registerUser',{...this.formRegister,clear})
        },
         getLogin(){
        this.$parent.formShowRegister = false
        this.$parent.formShowLogin = true
    }
    }
}
</script>
<style >

</style>