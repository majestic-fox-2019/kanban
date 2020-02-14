<template>
  <!-- ini itemnya -->
  <draggable
    group="progressCard.status"
    v-model="progressCard.items"
    @start="drag = true"
    @end="drag = false"
    @change="berubah"
  >
    <todo
      @showTodoDetails="showTodoDetails"
      v-for="(item, key) in progressCard.items"
      :key="key"
      :cardData="item"
    ></todo>
  </draggable>
  <!-- sampe sini item
            nya -->
  <!-- <p v-for="(data, key) in progressCards.ite"> - ini itemnya</p> -->
</template>

<script>
import todo from './todo'
import axios from 'axios'
import draggable from 'vuedraggable'
export default {
  name: 'draggableItem',
  props: ['progressCard'],
  components: {
    todo,
    draggable
  },
  methods: {
    berubah(event) {
      // console.log(this.progressCard.status)
      // console.log('this is come from draggable', event.added.element)
      axios({
        method: 'patch',
        url: `http://localhost:3000/todos/${event.added.element.id}/status`,
        data: {
          status: this.progressCard.status
        }
      })
        .then(result => {
          console.log('success draggable onchange')
          this.$socket.emit('updateStatus')
        })
        .catch(err => {
          console.log(err, 'error draggable onchange')
        })
    },
    showTodoDetails(cardData) {
      this.$emit('showTodoDetails', cardData)
    }
  }
}
</script>

<style></style>
