<template>
  <div id="app">
    <mainpage></mainpage>
  </div>
</template>

<script>
import mainpage from './components/mainpage'

export default {
  name: 'app',
  components: {
    mainpage
  },
  methods : {
    addData(){
      kanban.doc('task').set({
        test : "test"
      })
    },
    getData(){
      kanban.doc("task").get().then((doc) => {
        console.log(doc.data())
      });
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
