<template>
  <div>
    <nav id="navbar">
      <div id="mainButton">
        <div class="btn-text" v-b-modal.modal-1>Create Task</div>
      </div>
      <div>KANBAND</div>
      <div id="userLoginRegister">
        <div id="register" @click="logoutDestroy">Logout</div>
      </div>
    </nav>

    <!-- Card -->
    <section class="containerBoard">
      <div class="boardKanban" v-for="(category, i) in categorys" :key="i">
        
        <div class="titleBoxKanban">
          <h3>{{category.name}}</h3>
          <img v-bind:src="category.img" />
        </div>
        

        <!-- inner cards -->
        <div
          class="cardInnerKanban"
          v-for="(task,index) in tasks"
          :key="index"
          v-if="task.category == category.name"
        >
          <!-- <h4>{{task.title}}</h4>
          <div class="description">
            <p>{{task.description}}</p>
          </div>

          <div class="btnCard">
            <div type="button" id="btnEditCard" v-b-modal.modal-2 @click.prevent="editCardCategory(task)">
              <span>change</span>
            </div>
            <div type="button" id="btnDeleteCard" @click.prevent="deleteCard(task.id)">
              <span>delete</span>
            </div>
          </div> -->
          <innerCard :badges="badges" :title="task.title" :description="task.description" :task="task" :id="task.id" @deletecard="deleteCard(task.id)" @editcardcategory="editCardCategory(task)" @editallcard="editAllCard(task)"></innerCard>
        </div>
        <!-- end inner cards -->

        <div class="btnAddTask">{{category.name}}</div>
      </div>
    </section>
    <!-- end Card -->

        <!-- modal create -->
            <div>
              <b-modal id="modal-1" title="Create Task" hide-footer>
                <!-- <b-form @submit="onSubmit" @reset="onReset"> -->
                <b-form>
                  <b-form-group  label="Title:" >
                  <b-form-input v-model="formCreate.title" type="text" required placeholder="title"></b-form-input>
                  <b-form-group  label="Status:" >
                 <!--  <b-form-input v-model="formCreate.status" type="text" required placeholder="status"></b-form-input> -->
                <b-form-select v-model="formCreate.status" :options="options"></b-form-select>
                  <b-form-group  label="Description:" >
                  <b-form-input v-model="formCreate.description" type="text" required placeholder="description"></b-form-input>
                  <b-form-group  label="Category:" >
                  <b-form-input v-model="formCreate.category" type="text" required placeholder="category" disabled></b-form-input>
                  <b-button type="button" variant="primary" @click.prevent="createCard">Submit</b-button>
              <!-- <b-button type="reset" variant="danger">Reset</b-button> -->
                </b-form>
              </b-modal>
            </div>
        <!-- end modal create -->

        <!-- modal edit pindah card -->
        <div>
              <b-modal id="modal-2" title="Edit card" hide-footer>                
                <b-form>
                  <b-form-group  label="Title:" >
                  <b-form-input v-model="getEdit.title" type="text" required placeholder="title" disabled> </b-form-input>
                  <b-form-group  label="Description:" >
                  <b-form-input v-model="getEdit.description" type="text" required placeholder="description" disabled></b-form-input>
                  <b-form-group  label="Category:" >
                  <b-form-input v-model="getEdit.category" type="text" required placeholder="category" disabled></b-form-input>
                  <b-button type="button" variant="primary" v-if="getEdit.category !== 'backlog'" @click.prevent="movePevCategory()">prev</b-button>
              <b-button type="button" variant="primary" v-if="getEdit.category !== 'done'" @click.prevent="moveNextCategory()">next</b-button>
                </b-form>
              </b-modal>
        </div>
        <!-- end modal edit pindah card-->

        <!-- modal edit All card -->
        <div>
              <b-modal id="modal-3" title="Edit card" hide-footer>                
                <b-form>
                  <b-form-group  label="Title:" >
                  <b-form-input v-model="getEdit.title" type="text" required placeholder="title" > </b-form-input>
                  <b-form-group  label="Description:" >
                  <b-form-input v-model="getEdit.description" type="text" required placeholder="description" ></b-form-input>
                  <b-form-group  label="Category:" >
                  <b-form-input v-model="getEdit.category" type="text" required placeholder="category" disabled></b-form-input>
                  <b-button type="button" variant="primary" @click.prevent="editAllcardSubmit">Update</b-button>              
                </b-form>
              </b-modal>
        </div>
        <!-- end modal edit All card-->


  </div>
</template>

<script>
import Vue from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import innerCard from './InnerCard'
import VueSocketIOExt from "vue-socket.io-extended";
import io from "socket.io-client";
const server = "http://localhost:3000"
// const server = "https://hidden-caverns-32228.herokuapp.com";


const socket = io(`${server}`);
Vue.use(VueSocketIOExt, socket);


export default {
  name: "navbar",
  components:{
    innerCard
  },
sockets: {
    connect() {
      console.log("socket connected");
    },
    createTask() {
      console.log("example");       
      this.showAllTask()
    },
    findTask(val){
      this.showAllTask()
      this.editCardCategory(task)
      this.editAllCard(task)
    },
    updateOne(val){
      this.showAllTask()
      this.editCardCategory(task)
      this.moveNextCategory()
      this.movePevCategory()
    },
    updateAll(){
      this.showAllTask()      
      this.editAllCard(task)
      this.editAllcardSubmit()
    },
    deleteDestroy(){
      this.showAllTask()      
      this.deleteCard(id)
    }
  },
  data() {
    return {
        options: [         
          { value: 'low', text: 'Low Level' },
          { value: 'medium', text: 'Medium Level' },
          { value: 'high', text: 'High level' }          
        ],

      tasks: [],
      categorys: [
        { name: "backlog", img: require("../asset/img/book-open.svg") },
        { name: "todo", img: require("../asset/img/crosshair.svg") },
        { name: "completed", img: require("../asset/img/activity.svg") },
        { name: "done", img: require("../asset/img/hexagon.svg") }
      ],      
      formCreate:{
        title:null,
        description:null,
        status:null,
        category:'backlog',
      },
      updateMoveCardId: null,
      getEdit:{
        title:null,
        description:null,
        status:null,
        category:null

      },
      badges:{
        isLow:false,
        isMedium:false,
        isHigh:false
      }
    };
  },
  methods: {
    showAllTask() {
      axios({
        method: "get",
        url: `${server}/task`,
        headers: {
          token: localStorage.token
        }
      })
        .then(resultAllTask => {
          this.tasks = resultAllTask.data;
          // this.formCreate.title = null
          // this.formCreate.description = null
          // this.formCreate.status = null
        })
        .catch(err => {
          console.log(err);
        });
    },
    createCard(){      
        axios({
        method: "post",
        url:`${server}/task`,
        headers:{
          token: localStorage.token
        },
        data:{
          title:this.formCreate.title,
          description:this.formCreate.description,
          status:this.formCreate.status,
          category:this.formCreate.category
        }
      })
      .then(resultCreated=>{
        this.showAllTask()
        this.formCreate.title = null
        this.formCreate.description = null
        this.formCreate.status = null
        this.$bvModal.hide('modal-1')
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
      })
      .catch(err=>{
        console.log(err)
          Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',          
        })
      })
    },

    editCardCategory(task){
        this.$bvModal.show('modal-2')
        this.updateMoveCardId = task.id
        this.getEdit.title = task.title
        this.getEdit.description = task.description
        this.getEdit.status = task.status
        this.getEdit.category = task.category
    },
    editAllCard(task){
        this.$bvModal.show('modal-3')
        this.updateMoveCardId = task.id
        this.getEdit.title = task.title
        this.getEdit.description = task.description
        this.getEdit.status = task.status
        this.getEdit.category = task.category
    },

editAllcardSubmit(){
  axios({
    method:'put',
    url:`${server}/task/${this.updateMoveCardId}`,
    headers:{token:localStorage.token},
    data:{
      title:this.getEdit.title,
      status:this.getEdit.status,
      description:this.getEdit.description
    }
  })
  .then(resultEditAllcard=>{
    this.showAllTask()
    
    this.$bvModal.hide('modal-3')
  })
  .catch(err=>{
    console.log(err)
    Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: `Unauthorized`,
  // footer: '<a href>Why do I have this issue?</a>'
})
  })
},

  moveNextCategory(){
    let status = ''    
    if (this.getEdit.category == 'backlog') {
      status = 'todo'
    }
    else if(this.getEdit.category == 'todo'){
      status = 'completed'
    }
    else if(this.getEdit.category == 'completed'){
      status = 'done'    
    }

    axios({
      method:'patch',
      url:`${server}/task/${this.updateMoveCardId}`,
      headers:{ token: localStorage.token},
      data:  {
        category: status
      },  
    })
    .then(resultMoveCard =>{
      this.showAllTask()
      this.$bvModal.hide('modal-2')
    })
    .catch(err=>{
      console.log(err)
      Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Something went wrong!',
      
    })
    })
  },

  movePevCategory(){
    let status = ''
    if (this.getEdit.category == 'done') {
      status = 'completed'
    }
    else if(this.getEdit.category == 'completed'){
      status = 'todo'
    }
    else if(this.getEdit.category == 'todo'){
      status = 'backlog'    
    }
     axios({
      method:'patch',
      url:`${server}/task/${this.updateMoveCardId}`,
      headers:{ token: localStorage.token},
      data:  {
        category: status
      },  
    })
    .then(resultMoveCard =>{
      this.showAllTask()
      this.$bvModal.hide('modal-2')
    })
    .catch(err=>{
      console.log(err)
          Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
          
        })
    })
  },

    deleteCard(id) {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          axios({
          method: "delete",
          url: `${server}/task/${id}`,
          headers: { token: localStorage.token }
        })
            .then(dataDelete => {
              this.showAllTask();
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
            })
          .catch(err => {
            console.log(err);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: `Something went wrong!`,
            })
          });
        }
      })
      // axios({
      //     method: "delete",
      //     url: `${server}/task/${id}`,
      //     headers: { token: localStorage.token }
      //   })
      //     .then(dataDelete => {
      //       this.showAllTask();
            
      //     })
      //     .catch(err => {
      //       console.log(err);
      //     });
    

    },

    logoutDestroy(){
      localStorage.clear()
      this.$emit('logout')
    }
},
  created() {
    this.showAllTask();
  }
};
</script>




<style>
</style>