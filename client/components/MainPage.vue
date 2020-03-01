<template>
  <div id="homePage">
    <div class="container-head">
      <nav class="navbar navbar-expand-lg navbar-light bg-light d-flex justify-content-between align-items-center">
        <a class="navbar-brand" href="#">K-Kanban</a>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
          </ul>
        </div>
        <div :useremail="useremail" style="margin-right:20px;">{{useremail}}</div>
        <button class="btn btn-outline-success my-2 my-sm-0" @click="$emit('logout')" type="submit">Logout</button>
      </nav>
    </div>
    <div class="container-body d-flex justify-content-around">
      <div class="d-flex justify-content-start card-column">
        <div v-for="(category,i) in categories" :key="i">
          <div class="d-flex flex-column bd-highlight mb-3 card-container">
            <center><div class="category-bar">{{category.category}}</div></center>
              <div v-if="category.category">
                <div class="scroll">
                  <draggable v-model="category.tasks" group="categories" @end="moving">
                    <transition-group tag="div" :id="category.category">
                      <div class="card" v-for="(task) in category.tasks" :key="task.id" :id="task.id">
                        <div class="card-body d-flex flex-column bd-highlight mb-3">
                          <div class="card-email d-flex justify-content-between">
                            <div>{{ task.date | dateFormat}}</div>
                            <div>
                              <div class="email-bg">{{task.email}}</div>
                            </div>
                          </div>
                          <p class="card-text">{{task.title}}</p>
                          <div class="d-flex justify-content-between">
                            <div>
                              <button @click="$emit('backstep',task.id)" v-if="category.category !== 'Backlog'" class="card-link backBtn">{{left}}</button>
                            </div>
                            <img @click="$emit('deletetask',task.id)" class="card-link deleteBtn" src="../img/garbage-icon.png" alt="">
                            <div>
                              <button @click="$emit('nextstep',task.id)" v-if="category.category !== 'Done'"  class="card-link nextBtn">{{right}}</button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </transition-group>
                  </draggable>
                </div>
              </div>
              <div class="d-flex justify-content-between align-items-center">
                <input @keyup.enter="$emit('addtask',category)" maxlength="255" v-model="category.title" class="input-card" placeholder="Add a card..." type="text">
                <div v-show="textLength == 0">{{category.title | textLength}}/255</div>
            </div>
          </div>  
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import he from "he";
import draggable from 'vuedraggable';
import Swal from "sweetalert2";
import axios from "axios";
import moment from "moment";
// var url = `http://localhost:3000`
var url = `https://sleepy-bastion-70749.herokuapp.com`

export default {
  data(){
    return {
      textLength: 0,
      left: '',
      right: '',
    }
  },
  components:{
    draggable
  },
  props: ['showhomepage','categories','addtask','backstep','nextstep','addtask','deletetask','category','useremail'],
  methods: {
    decode(str){
        return he.decode(str);
    },
    moving(event){
      axios({
        url:`${url}/task/${event.item.id}`, 
        method:'PATCH',
        headers: {token: localStorage.token},
        data:{
          move: event.to.id
        }
      })
        .then((response)=> {
          Swal.fire({
            toast: true,
            position: 'top',
            text: "task moved",
            timerProgressBar:true,
            showConfirmButton: false,
            width: 100,
            timer: 700
          })
        })
        .catch((error)=> {
          Swal.fire("Oops!", "You Don't Have Access!", "warning")
          console.log(`gagal update`)
        }) 
    }
  },
  filters: {
    dateFormat: function (date) {
      return moment(date).format("Do MMM YYYY")
    },
    textLength: function (text = 0) {
      return text.length
    }
  },
  created: function(){
    this.left = this.decode('&#x2B05');
    this.right = this.decode('&#x27A1');
  }
};
</script>

<style>

</style>
