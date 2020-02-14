<template>
  <div class="sidebar-kanban">
    <div class="text-kanban">
      <h1>KANBAN</h1>
      <p>Project management tool designed to help visualize work and maximize efficiency.</p>
      <a href v-on:click.prevent="addButton">
        <i class="fas fa-plus"></i> Add Task!
      </a>
    </div>

    <form v-on:submit.prevent="$emit('addtask', form)" v-if="inputadd">
      <div class="form-group">
        <input type="text" v-model="form.title" placeholder="title" />
      </div>

      <div class="form-group">
        <textarea v-model=" form.description" placeholder="description"></textarea>
      </div>
      <div class="form-group">
        <input type="hidden" v-model=" form.status" />
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>

    <button class="btn btn-primary" v-on:click="$emit('logOutButton')">Log Out</button>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      inputadd: false,
      form: {
        title: null,
        description: null,
        status: "backlog"
      }
    };
  },
  methods: {
    addButton() {
      if (this.inputadd == false) {
        return (this.inputadd = true);
      } else {
        return (this.inputadd = false);
      }
    }
  }
};
</script>

<style scoped>
input,
textarea {
  margin: 5px;
  padding: 3px;
  border-radius: 10px;
  font-family: "Lato", sans-serif;
  color: #525f5f;
}
.btn {
  margin: 10px;
  padding: 5px;
  border-radius: 10px;
  font-family: "Lato", sans-serif;
  color: #525f5f;
}

.btn:hover {
  background-color: #abbda3;
  cursor: pointer;
  box-shadow: 2px 2px;
}
</style>