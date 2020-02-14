<template>
  <div class="row" style="margin-top: -5%; margin-right: 0px; margin-left: 7px">
    <div class="col" v-for="(kanban, i) in kanbans" :key="i">
      <cardKanban
        @getKanban="getKanban"
        @kanbanGoEdit="kanbanGoEdit"
        :name="kanban.name"
        :kanbanItems="kanban.items"
      ></cardKanban>
    </div>
  </div>
</template>

<script>
import cardKanban from "../components/cardKanban";
export default {
  props: ["kanbans"],
  methods: {
    getKanban() {
      this.$emit("getKanban");
    },
    kanbanGoEdit() {
      this.$emit("kanbanGoEdit");
    }
  },
  components: {
    cardKanban
  }
};
</script>

<style>
</style>