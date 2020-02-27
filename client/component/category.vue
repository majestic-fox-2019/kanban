<template>
  <div class="col-md-3 col-xs-12 board">
    <h3>{{category.name}}</h3>
    <card
      v-for="(task, taskSequence) in category.Tasks"
      :key="taskSequence"
      :task="task"
      @load-data="$emit('load-data')"
    ></card>
    <add-task
      v-if="categoryId === category.id ? true : false"
      @hide="hide"
      @load-data="$emit('load-data')"
      :catid="category.id"
      :projectid="project.id"
    ></add-task>
    <div class="add-task">
      <a href v-on:click.prevent="show(category.id)">
        <i class="fa fa-plus"></i> Add Task
      </a>
    </div>
  </div>
</template>

<script>
import card from "./kanban_task";
import addTask from "./add_task";
export default {
  data: function() {
    return {
      categoryId: null
    };
  },
  components: {
    card,
    "add-task": addTask
  },
  props: ["category", "project"],
  methods: {
    hide: function() {
      this.categoryId = null;
    },
    show: function(id) {
      this.categoryId = id;
    }
  }
};
</script>