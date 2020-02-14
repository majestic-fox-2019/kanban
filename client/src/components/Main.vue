<template>
  <div id="main">
      <Tabs :projectDatas="projectData" @projectCreated="newProjectAdded" @projectUpdate="projectUpdated"></Tabs>
  </div>
</template>

<script>
import Tabs from './Tabs'

export default {
    name: 'Main',
    components: {
        Tabs
    },
    props: {
        projectData: {
            type: Array
        }
    },
    methods: {
        newProjectAdded(){
            this.$emit('newProjectCreated', true)
        },
        projectUpdated() {
            this.$emit('updateProject', true)
        }
    }
}
</script>

<style scoped>
#main {
    margin-top: 1%;
}

</style>