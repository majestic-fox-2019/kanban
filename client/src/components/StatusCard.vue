<template>
  <div id="statusCard">
      <div class="statusHeader" :style="`background-color:${catTitle.bg}`">
          <h1>{{catTitle.status}}</h1>
      </div>
        <div v-for="(task, i) in catTitle.tasks" :key="i">
          <TaskCard :projectName="projectTitle" :taskDetails="task" @statusChange="statusUpdate($event)"></TaskCard>
        </div>
  </div>
</template>

<script>
import TaskCard from './TaskCard'
export default {
    name: 'StatusCard',
    props: {
        catTitle: {
            type: Object
        },
        projectTitle: {
            type: Object
        }
    },
    components: {
        TaskCard
    },
    methods: {
        statusUpdate(id) {
            this.$emit('refreshTasks', id)
        }
    },
}
</script>

<style scoped>
#statusCard {
    margin-top: 1%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    width: 20%;
    border-radius: 15px;
    min-height: 25vh;
    padding-top: 1%;
    background-color: #424242;
}
.statusHeader {
    align-self: center;
    text-align: center;
    width: 90%;
    box-shadow: 10px 10px 5px 0px rgba(0,0,0,0.75);
}
</style>