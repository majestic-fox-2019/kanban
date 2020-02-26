<template>
  <div>
    <div style="margin-bottom:1em">
      <b-badge v-if="task.status == 'low'" variant="success">Low</b-badge>
      <b-badge v-if="task.status == 'medium'" variant="warning">Medium</b-badge>
      <b-badge v-if="task.status == 'high'" variant="danger">High</b-badge>
    </div>
    <div id="EditTitleAndDescription">
      <h5>{{title}}</h5>
      <div type="button" id="editBtnAll" @click.prevent="$emit('editallcard')">edit</div>
    </div>
    <div class="description">
      <p>{{description}}</p>
    </div>

    <div id="nameUser">
      <p>by:{{task.User.name}}</p>
    </div>
    <div class="btnCard">
      <div
        type="button"
        id="btnEditCard"
        v-b-modal.modal-2
        @click.prevent="$emit('editcardcategory',task)"
      >
        <span>change</span>
      </div>
      <div type="button" id="btnDeleteCard" @click.prevent="$emit('deletecard',id)">
        <span>delete</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["title", "description", "task", "id", "badges"]
};
</script>

<style>
</style>