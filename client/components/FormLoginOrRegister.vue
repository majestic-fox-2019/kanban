<template>
  <div>
      <div class="container" style="height:100vh;">
        <div class="row" >
          <div class="col-sm-9 col-md-7 col-lg-5 mx-auto ">
            <div class="card card-signin my-5">
              <div class="card-body">
                <h5 class="card-title text-center">{{type}}</h5>
                <form class="form-signin" @submit.prevent="$emit('submit')">
                  <div class="form-label-group">
                    <input type="text"  class="form-control" placeholder="Email address" v-model="value.email">
                    <label for="inputEmail">Email address</label>
                  </div>
                  <div class="form-label-group" v-if="value.name != null">
                    <input type="text" class="form-control" placeholder="Name" v-model="value.name" >
                    <label for="inputPassword">Name</label>
                  </div>
                  <div class="form-label-group">
                    <input type="password"  class="form-control" placeholder="Password" v-model="value.password" >
                    <label for="inputPassword">Password</label>
                  </div>
                  <button class="btn btn-lg btn-primary btn-block text-uppercase" type="submit">{{type}}</button>
                </form>
                <br>
                <button class="btn btn-lg btn-primary btn-block text-uppercase" type="btn" @click="$emit('change')">{{typechange}}</button>
                <button class="btn btn-lg btn-primary btn-block text-uppercase" type="btn" @click="$emit('googlelogin')">Google Login</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  props:['value','type','typechange'],
}
</script>
<style>

</style>