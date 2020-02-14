<template >
<div>

  <navbar></navbar>
  <kanban ></kanban>
</div>
</template>

<script>

 import navbar from "./navbar"
 import barcontrol from "./barcontrol"
 import kanban from "./kanban"

 import axios from "axios"
 
 

  export default {
  
    components: {
      navbar,
      barcontrol,
      kanban
    },

    created(){

    }
   }


</script>



<style scoped>

</style>

 