<template>
  <div>
    <div class="container-fluid divNavBar fixed-top">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="" v-on:click.prevent="kanban">Kanban</a>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <a class="nav-link" href="" v-on:click.prevent="addTask">Add Task<span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item active">
              <a class="nav-link" href="" v-on:click.prevent="logout" style="color:gold">LogOut</a>
            </li>
          </ul>
          <form class="form-inline my-2 my-lg-0">
            <input class="form-control mr-sm-2 bg-dark is-valid text-white" style="width: 350px;" v-if="email" v-bind:value="email" readonly>
            <!-- <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"> -->
            <!-- <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button> -->
          </form>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  data: function() {
    return {

    }
  },
  props: [ 'email' ],
  methods: {
    kanban() {
      this.$emit('kanban')
    },
    addTask() {
      this.$emit('addTask')
    },
    logout() {
      this.$emit('logout')
    }
  }

}
</script>

<style>

</style>