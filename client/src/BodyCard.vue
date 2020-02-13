<template>
<div>
  <div class="boxSize" >
  <b-card :title="judul" :sub-title="judul">
    <div v-for ="task in tasks" :key="task.id" >
    <!-- <Card :task="task" :categoryTask="judul" :thatUser="users" @getData="$emit('getAllData')"></Card> -->
    <Card :task="task" :categoryTask="judul" @getData="$emit('getAllData')"></Card>
    </div>
  </b-card>
</div>
</div>
  
</template>

<script>
import Card from "./Card"
import axios from "axios"
export default {
  components: {
    Card
  },
  props: ["judul", "users", "tasks"],
  mounted(){
    // console.log(this.users, "<< ini users")
    console.log("ini tasks", this.tasks)
  },
  updated: function(){
    console.log('body card updated')
  }
}
</script>

<style>
  .boxSize {
    min-width: 20vw;
    max-width: 20vw;
    margin-right: 5px;
    margin-top: 5px;
  }
</style>