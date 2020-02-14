<template>
  <div>
    <formAddKanban @getKanban="getKanban"></formAddKanban>
    <formEditKanban @getKanban="getKanban" :kanbanToEdit="kanbanToEdit"></formEditKanban>
  </div>
</template>

<script>
import formAddKanban from "../components/formAddKanban";
import formEditKanban from "../components/formEditKanban";
export default {
  name: "mainPage",
  props: ["kanbanToEdit"],
  components: {
    formAddKanban,
    formEditKanban
  },
  methods: {
    getKanban() {
      this.$emit("getKanban");
    }
  }
};
</script>

<style scoped>
</style>