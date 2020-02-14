<template>
  <div class="col-md-3 col-xs-12">
    <div class="project-item">
      <h3 class="title">{{project.name}}</h3>
      <div class="description">
        <span>{{project.description}}</span>
      </div>
      <a href class="btn-project" @click.prevent="getTask">See Progress</a>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["project"],
  methods: {
    getTask: function() {
      this.$emit("load-category", {project: this.project});
    },
  }
};
</script>