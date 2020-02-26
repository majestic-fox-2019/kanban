<template>
  <mdb-navbar color="default" dark class="animated fadeIn">
    <!-- <mdb-navbar-brand class="nav-brand" href="https://mdbootstrap.com/">Kanban</mdb-navbar-brand> -->
    <mdb-navbar-toggler>
      <mdb-navbar-nav>
        <mdb-nav-item class="d-flex" href="#" active>
          <p>KanBan</p>
        </mdb-nav-item>
      </mdb-navbar-nav>

      <div v-if="isLogin" class="username">
        <mdb-icon icon="user-circle" class="mr-1"></mdb-icon>
        {{username}}
        <mdbBtn color="danger" v-on:click="logout">
          <mdb-icon icon="sign-out-alt" class="mr-1" />Logout
        </mdbBtn>
      </div>
      <!-- <div v-if="isLogin" class="btn btn-danger mx-3">Logout</div> -->
    </mdb-navbar-toggler>
  </mdb-navbar>
</template>
<script>
import firebase from "firebase";
import {
  mdbIcon,
  mdbBtn,
  mdbNavbar,
  mdbNavbarBrand,
  mdbNavbarToggler,
  mdbNavbarNav,
  mdbNavItem,
  mdbDropdown,
  mdbDropdownMenu,
  mdbDropdownToggle,
  mdbInput,
  mdbDropdownItem
} from "mdbvue";
export default {
  name: "Navbar",
  components: {
    mdbIcon,
    mdbBtn,
    mdbNavbar,
    mdbNavbarBrand,
    mdbNavbarToggler,
    mdbNavbarNav,
    mdbNavItem,
    mdbDropdown,
    mdbDropdownMenu,
    mdbDropdownToggle,
    mdbDropdownItem,
    mdbInput
  },
  data() {
    return {
      isLogin: false,
      username: localStorage.getItem("username")
    };
  },
  methods: {
    checkLogin() {
      if (localStorage.getItem("token")) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }
    },
    logout() {
      localStorage.clear();
      firebase
        .auth()
        .signOut()
        .then(function() {
          // Sign-out successful.
          this.$emit("logout");
        })
        .catch(function(error) {
          // An error happened.
        });
      this.$emit("logout");
    }
  },
  created() {
    this.checkLogin();
  }
};
</script>

<style scoped>
.nav-brand {
  margin: 0;
  padding: 0;
}
p {
  font-size: 22px;
  margin-bottom: 0px;
}
.username {
  color: white;
  font-weight: bold;
}
</style>
