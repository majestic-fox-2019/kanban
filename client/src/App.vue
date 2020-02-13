<template>
  <div>
    <Navbar @getAllData="getData()"></Navbar>
  <div class="container d-flex ">
    <div v-for ="(category,label) in categoriesC" :key="label" >
        <BodyCard :judul="label" :tasks="categoriesC[label]" @getAllData="getData()"></BodyCard>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "./Navbar"
import BodyCard from "./BodyCard"
import axios from "axios"
export default {
  name: "app",
  components: {
    Navbar,
    BodyCard
  },
  data() {
    return {
      categories: ["Backlog", "Product", "Development", "Done"],
      users:[],
      userLogin:false,
      test: false
    }
  },
  methods: {
     getData: function() {
         let x ="z"
         let promise = axios({
              url: "http://localhost:3000/tasks",
              method: "GET",
              headers: {
                token: localStorage.getItem("token")
              }
            })
            .then(data => {
              console.log("axios success", data)
              this.userLogin = localStorage.getItem("userLogin")
                this.users = data.data
            })
            .catch(err => {
              console.log(err)
            })           
      }
  },

  created() {
    
  },
  mounted() {
    this.getData()
  },
  computed: {
    categoriesC: function(){
      let obj = {}
      for(let i = 0; i<this.categories.length;i++){
        obj[this.categories[i]] = []
        for(let j = 0; j<this.users.length;j++){
          if(this.categories[i] === this.users[j].category){
            obj[this.categories[i]].push(this.users[j])
          }
        }
      }
      return obj;
    }
  }
}
</script>

<style>

</style>