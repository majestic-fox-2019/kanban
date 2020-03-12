<template>
  <div class="site">
    <nav class="nav">
      <div class="nav-title" style="display:flex">
        <div style="margin-top: -2%">
          <img
            src="https://cdn141.picsart.com/294673609243211.png?r1024x1024"
            width="20"
            height="20"
          />
        </div>
        <div>A N B A N</div>
      </div>
      <button class="userName" v-if="statusLogin">user login: {{names}}</button>
      <ul class="nav-list">
        <button @click="logout" v-if="statusLogin">
          <li class="nav-item">Logout</li>
        </button>
        <button v-if="!statusLogin">
          <li class="nav-item">Account</li>
        </button>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: ["whatStatusLogin"],
  computed: {
    statusLogin: function() {
      return this.whatStatusLogin;
    },
    names: function() {
      return this.$root.nama;
    }
  },
  methods: {
    logout() {
      this.$emit("statusLoginFalse");
      localStorage.clear();
      function signOut() {
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function() {
          console.log("User signed out.");
        });
      }
    }
  },
  created() {
    this.$root.nama = localStorage.getItem("name");
  }
};
</script>

<style lang="scss" scoped>
$shadow-box: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
  0 1px 5px 0 rgba(0, 0, 0, 0.12);
$margin-item-title: 0px 30px;
$go-pointer: pointer;
$disp-inline-block: inline-block;

.nav {
  background: gray;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0;
  width: 100%;
  z-index: 99;
  min-height: 50px;
  height: auto;
  &-title {
    cursor: $go-pointer;
    margin: $margin-item-title;
  }
  &-item {
    cursor: $go-pointer;
    display: $disp-inline-block;
    margin: $margin-item-title;
  }
}

.userName {
  border-radius: 5px !important;
}

button {
  align-items: center;
  background-color: #eeeeee;
  border: 1px solid #ccc;
  border-radius: 50px;
  outline: none;
  color: #607d8b;
  position: relative;
  margin: 0;
  min-width: 20px;
  padding: 1px 1px;
  display: $disp-inline-block;
  font-size: 13px;
  font-weight: 600;
  cursor: $go-pointer;
}

button:hover {
  color: aqua;
  will-change: box-shadow;
  box-shadow: $shadow-box;
}

ul {
  margin-top: 7px;
  margin-bottom: 7px;
  margin-right: 10px;
}
</style>