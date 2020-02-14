<template>
    <div class="loginpage" v-show="loginshow">
        <div class="card" id="loginform" style=" max-width: 200rem;">
            <h3 class="card-header text-center">Login</h3>
            <div class="card-body">
                <div class="LoginForm">
                    <form @submit.prevent="$emit('login', form)">
                        <div class="form-group" id="LoginForm">
                            <label for="email">Email address:</label>
                            <input
                                type="email"
                                class="form-control"
                                id="LoginEmail"
                                v-model="form.email"
                            />
                        </div>
                        <div class="form-group">
                            <label for="password">Password:</label>
                            <input
                                type="password"
                                class="form-control"
                                id="LoginPassword"
                                v-model="form.password"
                            />
                        </div>
                        <div class="text-left">
                            <button
                                type="submit"
                                class="btn btn-primary btn-lg btn-block"
                                id="LoginSubmit"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
                <br />
                <button
                    type="button"
                    class="btn btn-primary btn-lg btn-block"
                    data-toggle="modal"
                    data-target="#registerModal"
                    v-on:click="showregister"
                >
                    Register
                </button>
                <br />
                <button
                    type="button"
                    class="btn btn-primary btn-lg btn-block"
                    v-on:click="signWithGoogle"
                >
                    google
                </button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "loginpage",
    props: ["loginshow"],
    data() {
        return {
            form: {
                email: "",
                password: ""
            }
        };
    },
    methods: {
        showregister() {
            this.$parent.showregister();
        },
        signWithGoogle() {
            this.$parent.signGoogle();
        }
    }
};
</script>
<style></style>
