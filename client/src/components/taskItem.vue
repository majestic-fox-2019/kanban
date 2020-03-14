<template>
  <div>
    <div class="pt-3 px-4 h-100 backgroundTodo">
      <b-card-group deck>
        <b-card
          v-for="(progressCard, key) in progressCards"
          :key="key"
          :bg-variant="`${progressCard.color}`"
          text-variant="white"
          class="text-center"
        >
          {{ progressCard.title }}
        </b-card>
      </b-card-group>
      <b-card-group deck>
        <b-card
          text-variant="black"
          class="text-center mt-0 h-100 overfolowNya bg-trans"
          v-for="(progressCard, key) in progressCards"
          :key="key"
        >
          <draggableItem
            @showTodoDetails="showTodoDetails"
            :progressCard="progressCard"
          ></draggableItem>
        </b-card>
      </b-card-group>
    </div>
  </div>
</template>

<script>
import draggableItem from './draggableItem'
import todo from './todo'
export default {
  name: 'taskItem',
  methods: {},
  data() {
    return {
      baru: ''
    }
  },
  props: ['progressCards'],
  components: {
    todo,

    draggableItem
  },
  methods: {
    showTodoDetails(cardData) {
      this.$emit('showTodoDetails', cardData)
    }
  }
}
</script>

<style scoped>
.h-100 {
  margin-top: 15px;
  min-height: 73vh;
  max-height: 73vh;
}
.overfolowNya {
  overflow-y: auto;
}

.backgroundTodo {
  background: url('../asset/backgroundTodo.svg');
}

.bg-trans {
  background-color: rgba(50, 77, 151, 0.18);
}
</style>
