<template>
  <div class="form-inline no-p navbar-right">
    <ul class="navbar-nav">
      <li class="nav-item dropdown">
        <a class="dropdown-toggle toggle-user" href="#" id="userMenu" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span class="users">{{ users }}</span>
          <!-- <img src="../../src/assets/images/vuejs.jpg" alt=""> -->
        </a>
        <div class="dropdown-menu dropdown-menu-right user-div-menu" aria-labelledby="userMenu">
          <a class="dropdown-item logout" @click="actLogout">Logout</a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['users'],
  data(){
    return {}
  },
  methods: {
    actLogout(){
      this.$parent.doLogout()
    }
  },
}
</script>