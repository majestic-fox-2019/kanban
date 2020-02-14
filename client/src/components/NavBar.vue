<template>
    <div class="navBar">
        <div></div>
        <div><h1>KanBan V2</h1></div>
        <div style="height:100%;">
            <div class="button" id="logoutButton" @click="logout">
                <span>Logout</span>
                <svg>
                    <polyline class="o1" points="0 0, 150 0, 150 55, 0 55, 0 0"></polyline>
                    <polyline class="o2" points="0 0, 150 0, 150 55, 0 55, 0 0"></polyline>
                </svg>
	        </div>
        </div>
    </div>
</template>

<script>
import Swal from 'sweetalert2'
export default {
    methods: {
        logout() {
            Swal.fire(
                'Your have successfully logged out',
                'Come back soon!',
                'success'
            )
            localStorage.clear()
            this.$emit('loggedOut', true)
        }
    }
}
</script>

<style scoped>
.navBar {
    display: flex;
    justify-content: space-between;
    height: 10vh;
    color: white;
    padding-right: 1%;
}

#logoutButton {
    border: none;
    background-color: rgb(87, 87, 87);
    height: 100%;
    width: 10vw;
    color: white;
    font-size: 1.6rem;
}

.button {
	 display: flex;
	 align-items: center;
	 justify-content: center;
	 cursor: pointer;
}
 .button svg {
	 height: 55px;
	 width: 150px;
	 fill: none;
	 stroke-width: 5;
}
 .button svg .o1 {
	 stroke: rgba(255, 179, 65, 0.7);
	 fill: #ffa114;
	 transition: all 1s ease-in-out;
}
 .button svg .o2 {
	 stroke: white;
	 stroke-dasharray: 20 420;
	 stroke-dashoffset: 20;
	 transition: all 1s ease-in-out;
}
 .button span {
	 position: absolute;
	 margin: auto 0;
	 text-transform: uppercase;
	 letter-spacing: 3px;
}
 .button:hover .o1 {
	 fill: rgba(204, 129, 16, 0.3);
}
 .button:hover .o2 {
	 stroke-dashoffset: -420;
}
</style>