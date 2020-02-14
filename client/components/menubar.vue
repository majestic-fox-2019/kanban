<template>
    <nav class="navbar navbar-light d-flex">
        <a class="navbar-brand ml-4" style="font-size:25px;" href="#"
            >MYKANBAN</a
        >
        <i class="fas fa-sign-out-alt mr-5" v-on:click="signout()"></i>
    </nav>
</template>

<script>
export default {
    name: "MenuBar",
    methods: {
        signout() {
            localStorage.removeItem("token");
            localStorage.removeItem("UserId");
            this.$parent.$parent.showpage();
        }
    }
};
</script>

<style></style>
