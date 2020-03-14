<template>
  <b-card
    :title="item.title"
    tag="article"
    class="mb-2"
  >
    <b-card-text>
      {{ item.description }}
    </b-card-text>

    <!-- <b-button href="#" variant="primary">Go somewhere</b-button> -->
    <b-button href="#" variant="danger" @click="deleteTask(item.id)"
      >delete</b-button
    >
  </b-card>
</template>

<script>
export default {
  name: "TaskItem",
  props: ["item"],
  methods: {
    deleteTask(id) {
      this.$axios({
        url: `${this.$SERVER_URL}/kanbans/${id}`,
        method: "delete",
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(() => {
          this.$socket.emit("dbChange");
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>

<style></style>
