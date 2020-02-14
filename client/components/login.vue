<template>
<div class="wrapper fadeInDown">
    <div id="formContent" v-if="showregister">
      <!-- Tabs Titles -->

      <!-- Icon -->
      <div class="fadeIn first">
                <p class="h2" style="color: black">
              <b-icon icon="person-fill">
              </p>
      </div>
      <form>
        <input
          type="text"
          id="login"
          class="fadeIn second"
          name="login"
          placeholder="register username"
          v-model="usernameReg"
        />
                <input
          type="text"
          id="login"
          class="fadeIn second"
          name="login"
          placeholder="email"
          v-model="emailReg"

        />
        <input
          type="password"
          id="password"
          class="fadeIn third"
          name="login"
          placeholder="password"
          v-model="passwordReg"
        />
        <input type="submit" @submit.prevent="showlist" class="fadeIn fourth" />
      </form>

      <!-- Remind Passowrd -->
      <div id="formFooter">
        <a class="underlineHover" @click="toshow"
          >already have account? go to login</a
        >
      </div>
    </div>

    <!--                             LOGIN PAGE                                    -->

        <div id="formContent" v-if="showlogin">
      <!-- Tabs Titles -->

      <!-- Icon -->
      <div class="fadeIn first">
                <p class="h2" style="color: black">
              <b-icon icon="person-fill">
              </p>
      </div>
      <form>
        <input
          type="text"
          id="login"
          class="fadeIn second"
          name="login email"
          placeholder="login"
          v-model="emailLog"

        />
        <input
          type="password"
          id="password"
          class="fadeIn third"
          name="login"
          placeholder="password"
          v-model="passwordReg"
          
        />
        <input type="submit" @submit.prevent="showlist" class="fadeIn fourth"/>
      </form>

      <!-- Remind Passowrd -->
      <div id="formFooter">
        <a class="underlineHover" @click="toshow"
          >don't have account? register yourself!</a
        >
      </div>
    </div>

  </div>
  
</template>
<script>
export default {
  name: "loginregister",
  data() {
    return {
      showregister: true,
      showlogin: false,
      passwordReg: null,
      emailReg: null,
      usernameReg: null,
      emailLog: null,
      passwordLog: null
      
    };
  },

  methods: {
    toshow(){
      this.showregister= !this.showregister
      this.showlogin=!this.showlogin
    }
  },

  showlist(){
    this.showregister= false
    this.showlogin=false
    $emit('showlist')
  }
};
</script>
<style></style>
