<template>
  <div>
      <div class="container-home">
          <Navbar></Navbar>
          <div class="cards">
            <div v-for="(title, i) in titles" :key="i">
                <Card v-bind:title="title" />
            </div>
          </div>
      </div>
  </div>
</template>

<script>
import Navbar from "./component/Navbar"
import Card from "./component/Card"
export default {
    data(){
        return {
            titles: ["Backlog", "Product", "Development", "Done"]
        }
    },
    components: {
        Navbar,
        Card
    }
}
</script>
<style lang="scss" scoped>
@import "../style/_variables.scss";
.cards {
    display: flex;
    justify-content: space-around;
    padding: 2rem;
    width: 100%;
    height: 87vh;
    border: 2px solid $white-color;
}
        
</style>