<template>
   <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
      <a class="navbar-brand" id="todo-user" href="#"><b>Kanban Project</b></a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
      <div class="collapse navbar-collapse ml-4" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
        </ul>
        <div class="form-inline my-2 my-lg-0">
          <a class="btn btn-sm trello-btn-bg text-light" @click.prevent="$emit('logout')">
           {{ email }} | <i class="fa fa-sign-out" aria-hidden="true"></i> Logout</a>
        </div>
    </nav>
</template>

<script>
export default {
  name : 'Navbar',
  props : ['email'],
}
</script>

<style>

</style>