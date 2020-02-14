<template>
<div>
    <div class="myModal" id="addTask">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Add tasks</h5>
              <button type="button" class="close" @click="$emit('closemodal')">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <form @submit.prevent="$emit('addtask')"> 
                <div class="modal-body">
                    <div class="form-group">
                    <label for="form-control">Category</label>
                    <select class="form-control" id="form-control" v-model="selectedcategory.name">
                        <option v-for="(category, i) in categorydata" :key="i" :value="category.text">
                            {{ category.text }}
                        </option>
                    </select>
                    <label for="message-text" class="col-form-label">Title:</label>
                    <textarea class="form-control" id="message-text" v-model="addtitle.text"></textarea>
                    <em><small style="color: red;" v-if="error">Title can't be empty.</small></em>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="$emit('closemodal')">Close</button>
                    <button type="submit" class="btn btn-primary">Proceed</button>
                </div>
            </form>
          </div>
        </div>
      </div>
</div>
</template>

<script>
export default {
    props: ['selectedcategory', 'categorydata', 'addtitle', 'error']
}
</script>

<style>

</style>