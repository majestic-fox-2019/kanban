<template>
  <div class="cardDiv2">
    <div class="card">
      <div class="formAdd">
        <form method="POST" v-on:submit.prevent="newAddCategory(title)">
          <input type="text" placeholder="New Category" v-model="title" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddCategory",
  props: ["addCategory"],
  data() {
    return {
      title: null
    };
  },
  methods: {
    newAddCategory(title) {
      this.addCategory(title);
      this.title = null;
    }
  }
};
</script>

<style>
</style>