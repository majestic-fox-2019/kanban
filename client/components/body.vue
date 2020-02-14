<template>
  <div>
    <div id="kanbans">
      <div class="category" v-for="content in taskcategory" :key="content.id">
        <div class="kanban-column">
          <div class="text">{{ content.nameCategory }}</div>
          <!-- content -->
          <div class="kanban-content whatever">
            <div class="isiKanban" v-for="task in content.Tasks" :key="task.id">
              {{ task.title }}
              <div class="button-x">
                <button class="button-close">
                  <div>
                    <span @click="destroy(task.id)">x</span>
                  </div>
                </button>
              </div>
              <div class="button-up updateModal">
                <button class="button-update">
                  <div>
                    <span
                      @emit="updateModal(task.id)"
                      type="button"
                      class="btn btn-primary"
                      data-toggle="modal"
                      data-target="#upModal"
                    >U</span>
                  </div>
                </button>
                <upModal :updateModal="{taskcategory, taskId}"></upModal>
              </div>
            </div>
          </div>
        </div>
        <div>
          <form @submit.prevent="addData(content.nameCategory, content.id)">
            <input class="addInput" v-model="title[content.nameCategory]" type="text" />
            <button class="btn fourth" type="submit">add a card...</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import buttonAdd from "./button";
// import axios from "axios";
// import Vue from "vue";
import upModal from "./updateModal";

export default {
  name: "kanbans",
  props: ["taskcategory", "title"],
  components: {
    upModal
  },
  data() {
    return {
      taskId: null,
      title: null
    };
  },
  methods: {
    destroy(id) {
      this.$emit("destroy", id);
    },

    addData(category, id) {
      this.taskId = id;
      this.$emit("addData", { data: { category, id } });
    }
  }
};
</script>
<style>
</style>
