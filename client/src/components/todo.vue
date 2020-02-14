<template>
  <div>
    <a
      @click="showTodoDetails"
      class="ui card ml-0 mb-4"
      style="background-color: rgb(192, 205, 224);"
    >
      <div is="sui-card-content">
        <div class="header">{{ cardData.title }}</div>
        <div class="meta">
          <!-- <span class="category">Animals</span> -->
        </div>
        <div class="description">
          <p>
            {{ cardData.content }}
          </p>
        </div>
      </div>
      <div is="sui-card-content" extra>
        <div class="right floated author">
          <img :src="cardData.creatorImg" class="ui avatar image" />
          {{ cardData.creator }}
        </div>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: 'todo',
  props: ['cardData'],
  data() {
    return {}
  },
  methods: {
    showTodoDetails() {
      this.$emit('showTodoDetails', this.cardData)
    }
  }
}
</script>

<style></style>
