<template>
  <div>
    <div id="EditTitleAndDescription">
      <h5>{{title}}</h5>
      <div type="button" id="editBtnAll" @click.prevent="$emit('editallcard')">edit</div>
    </div>
    <div class="description">
      <p>{{description}}</p>
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
  props: ["title", "description", "task", "id"]
};
</script>

<style>
</style>