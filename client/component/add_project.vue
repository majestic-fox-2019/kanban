<template>
  <div class="col-md-3 col-xs-12" @click.prevent="$emit('show')">
    <div class="add-project">
      <i class="fa fa-plus fa-4x center"></i>
      <h3>Create Project</h3>
    </div>
  </div>
</template>
<script>
export default {
  data: function() {
    return { 
      showAddForm : false
    };
  },
};
</script>