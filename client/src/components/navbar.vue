<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark d-flex justify-content-between">
      <div>
        <a class="navbar-brand" href="#">
          <i class="fas fa-pepper-hot"></i> KanBan V2
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
      </div>

      <div>
        <button @click="logOut()" type="button" class="btn btn-danger">Log Out</button>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    logOut() {
      localStorage.clear();
      this.$emit("login", true);
    }
  }
};
</script>

<style>
</style>