<template>
    <nav class="navbar navbar-expand-lg navbar-dark">
        <modal-login :backend_url="backend_url"></modal-login>
        <modal-register :backend_url="backend_url"></modal-register>

        <a class="navbar-brand" href="#">
            <b-icon icon="grid-fill"></b-icon>
            OKanban
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
    
        <div class="collapse navbar-collapse" id="navbarColor01">
            <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
                <a class="nav-link" href="#">
                    <b-icon icon="house-fill"></b-icon>
                    Home <span class="sr-only">(current)</span>
                </a>
            </li>
            <li class="nav-item">                
                <a class="nav-link" href="#">
                    <b-icon icon="kanban-fill"></b-icon>
                    Add Project 
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#">| <b-icon icon="info-fill"></b-icon>  Version: 0.0.1(Beta) |</a>
            </li>
            </ul>
            <custom-button 
                v-if="isLogin == null"
                v-b-modal.modalRegister 
                value="Register">
            </custom-button>
            <custom-button 
                v-if="isLogin == null"
                v-b-modal.modalLogin 
                value="Login">
            </custom-button>
            <div v-if="isLogin != null" @click="logout(); isLogin = '';">
                <custom-button value="Logout"></custom-button>
            </div>
        </div>
    </nav>        
</template>
<script>
    import ModalLogin from './ModalLogin';
    import ModalRegister from './ModalRegister';
    import Button from './Button';

    export default {
        props: ["backend_url"],
        components: {
            'modal-login': ModalLogin,
            'modal-register': ModalRegister,
            'custom-button': Button
        },
        data: function(){
            return {
                isLogin: localStorage.getItem("token")
            }
        },
        methods: {
            logout: function() {
                console.log("Asdksa");
                localStorage.removeItem('token');
                location.reload();
            }
        }
    }
</script>
<style scoped>

</style>