<template>
  <div class="login-page" :style="{display: active ? 'block' : 'none'}">
    <div class="form-signin-regist bg-front">
      <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
        <li class="nav-item">
          <a class="nav-link active" id="pills-home-tab" data-toggle="pill" href="#login" role="tab" aria-controls="pills-home" aria-selected="true">Sign in</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" id="pills-profile-tab" data-toggle="pill" href="#register" role="tab" aria-controls="pills-profile" aria-selected="false">Registration</a>
        </li>
      </ul>
      <div class="tab-content" id="pills-tabContent">
        <div class="tab-pane fade show active" id="login" role="tabpanel" aria-labelledby="pills-home-tab">
          <form @submit.prevent="actLogin">
            <div class="text-center mb-4">
              <h1 class="h3 mb-3 font-weight-normal">KANBAN</h1>
            </div>
            <div class="form-group">
              <input type="email" v-model="data_form_login.email" class="form-control" placeholder="Email" autofocus>
            </div>
            <div class="form-group">
              <input type="password" v-model="data_form_login.password" class="form-control" placeholder="Password">
            </div>
            <button class="btn button-primary btn-block" type="submit">Sign in</button>
            <p class="text-center mt-3">Or you want login with Google Account</p>
            <div class="login-google" @click="googleSignIn">
              <div class='g-sign-in-button'>
                <div class=content-wrapper>
                  <div class='logo-wrapper'>  
                    <img src='https://developers.google.com/identity/images/g-logo.png'>
                  </div>  
                  <span class='text-container'> 
                    <span>Sign in with Google</span>
                  </span>
                </div>  
              </div>
            </div>
          </form>
        </div>
        <div class="tab-pane fade" id="register" role="tabpanel" aria-labelledby="pills-profile-tab">
          <form @submit.prevent="actRegister">
            <div class="text-center mb-4">
              <h1 class="h3 mb-3 font-weight-normal">KANBAN</h1>
            </div>
            <div class="form-group">
              <input type="text" v-model="data_form_register.name" class="form-control" placeholder="Name" autofocus>
            </div>
            <div class="form-group">
              <input type="email" v-model="data_form_register.email" class="form-control" placeholder="Email">
            </div>
            <div class="form-group">
              <input type="password" v-model="data_form_register.password" class="form-control" placeholder="Password">
            </div>
            <button class="btn btn-success btn-block" type="submit">Registration</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['active', 'data_form_login', 'data_form_register'],
  data(){
    return {}
  },
  methods: {
    actLogin(){
      this.$parent.doLogin();
    },
    actRegister(){
      this.$parent.doRegister();
    },
    googleSignIn(){
      this.$parent.doGoogleSignIn()
    }
  }
}
</script>