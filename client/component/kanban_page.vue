<template>
  <div class="container-fluid" id="kanban">
    <div class="project-name">
      <h2>{{project.name}}</h2>
      <a href="" @click.prevent="$emit('click')">
        <i class="fa fa-home fa-2x"></i>
      </a>
    </div>
    <div class="row">
      <category
        @load-data="$emit('load-data')"
        v-for="(category, catSequence) in categories"
        :key="catSequence"
        :category="category"
        :project="project"
      ></category>
    </div>
  </div>
</template>

<script>
import category from "./category";
export default {
  props: ["categories", "project"],
  components: {
    category
  }
};
</script>