<template>
  <div class="category">
    <div class="title">
      <h4>{{upperCase}}</h4>
    </div>
    <card
      :lists="lists"
      :name="name"
      @deletetask="$emit('deletetask', $event)"
      @updatetask="$emit('updatetask', $event)"
    ></card>
  </div>
</template>

<script>
import card from "./card";
export default {
  components: {
    card
  },
  props: ["lists", "name"],
  computed: {
    upperCase: function() {
      return this.name.toUpperCase();
    }
  }
};
</script>