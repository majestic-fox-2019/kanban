<template>
    <div>
        <div class="container" id='formLogin'>
            <div class="row">
                <div class="col-md-12 min-vh-100 d-flex flex-column justify-content-center">
                    <div class="row">
                        <div class="col-lg-6 col-md-8 mx-auto">
                            <form @submit.prevent="$emit(checkType(formtype))">
                            <!-- form card login -->
                            <div class="card rounded shadow shadow-sm" >
                                <div class="card-header">
                                    <h3 class="mb-0">{{ formtype }}</h3>
                                </div>
                                <div class="card-body">
                                    <div class="form-group" v-if="formtype == 'Register'">
                                        <label for="name">Name</label>
                                        <input type="text" class="form-control form-control-lg rounded-0" v-model="value.name" placeholder="Name">
                                    </div>
                                    <div class="form-group" >
                                        <label for="email">Email</label>
                                        <input type="text" class="form-control form-control-lg rounded-0" v-model="value.email" placeholder="Email Address">
                                    </div>
                                    <div class="form-group">
                                        <label>Password</label>
                                        <input type="password" class="form-control form-control-lg rounded-0" v-model="value.password" placeholder="Password">
                                    </div>
                                    <div>
                                        <label class="custom-control custom-checkbox text-left pl-0" v-if="formtype == 'Login'">
                                            <small><a href="" @click.prevent='$emit("showregisterform")'>Don't have an account? Register Here</a></small>
                                        </label>
                                        <label class="custom-control custom-checkbox text-left pl-0" v-else>
                                            <small><a href="" @click.prevent='$emit("showloginform")'>Click here to sign in</a></small>
                                        </label>
                                    </div>
                                    <img class="google-login" src="../assets/google-icon-signin.png" alt="Google Login" @click="$emit('googlelogin')">
                                    <button type="submit" class="btn btn-primary btn-lg float-right" id="btnLogin">{{ formtype }}</button>
                                </div>
                                <hr class="mt-0">
                                <!--/card-block-->
                            </div>
                            </form>
                            <!-- /form card login -->
                        </div>
                    </div>
                    <!--/row-->
                </div>
                <!--/col-->
            </div>
            <!--/row-->
        </div>
    </div>
</template>

<script>
export default {
    props: ['value', 'formtype'],
    methods: {
        checkType(type){
            type = type.toLowerCase()
            return type
        }
    }
}
</script>

<style>

</style>