<template>
    <div
        class="registerpage loginpage"
        v-show="registershow"
        id="loginregister"
    >
        <div class="card" id="loginform" style=" max-width: 200rem;">
            <h3 class="card-header text-center">Register</h3>
            <div class="card-body">
                <div class="registerForm">
                    <form @submit.prevent="$emit('register', form)">
                        <div class="form-group" id="registerForm">
                            <label for="email">Email address:</label>
                            <input
                                type="email"
                                class="form-control"
                                v-model="form.email"
                            />
                        </div>
                        <div class="form-group" id="registerForm">
                            <label for="email">Name:</label>
                            <input
                                type="text"
                                class="form-control"
                                v-model="form.name"
                            />
                        </div>
                        <div class="form-group">
                            <label for="password">Password:</label>
                            <input
                                type="password"
                                class="form-control"
                                id="registerPassword"
                                v-model="form.password"
                            />
                        </div>
                        <div class="text-left">
                            <button
                                type="submit"
                                class="btn btn-primary btn-lg btn-block"
                                id="registerSubmit"
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
                    v-on:click="showlogin"
                >
                    Login
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
    name: "registerpage",
    props: ["registershow"],
    data() {
        return {
            form: {
                email: "",
                password: "",
                name: ""
            }
        };
    },
    methods: {
        showlogin() {
            this.$parent.showpage();
        },
        signWithGoogle() {
            this.$parent.signGoogle();
        }
    }
};
</script>
<style scoped></style>
