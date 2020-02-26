<template>
    <div class="menuUtama">
        <nav class="navbar navbar-expand-lg navbar-light" style="background-color: #dfe4ea;">
            <a class="navbar-brand" ><img style="width: 30px;height: 30px;" src ="../img/heart.png"></a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item active">
                <a class="nav-link" style="cursor: pointer;" @click="Logout()">LogOut<span class="sr-only">(current)</span></a>
                </li>
            </ul>
            </div>
        </nav>
    </div>
</template>
<script>
export default {
    name:"menuUtama",
    methods:{
        Logout:function(){
            localStorage.clear()
            this.$parent.mainMenu = false
            this.$parent.formShowLogin = true
            this.$parent.formShowRegister = false
            var auth2 = gapi.auth2.getAuthInstance();
                auth2.signOut().then(function () {
                console.log('User signed out.');
            });

        }
    }
}
</script>
<style>

</style>