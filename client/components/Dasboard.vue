<template>
  <div>
    <nav id="navbar">
      <div id="mainButton">
        <div class="btn-text" v-b-modal.modal-1>Create Task</div>
      </div>
      <div>KANBAND</div>
      <div id="userLoginRegister">
        <div id="register">Logout</div>
      </div>
    </nav>

    <!-- Card -->
    <section class="containerBoard">
      <div class="boardKanban" v-for="(category, i) in categorys" :key="i">
        <div class="titleBoxKanban">
          <h3>{{category.name}}</h3>
          <img v-bind:src="category.img" />
        </div>

        <div
          class="cardInnerKanban"
          v-for="(task,index) in tasks"
          :key="index"
          v-if="task.category == category.name"
        >
          <h4>{{task.title}}</h4>
          <div class="description">
            <p>{{task.description}}</p>
          </div>

          <div class="btnCard">
            <div type="button" id="btnEditCard">
              <span>edit</span>
            </div>
            <div type="button" id="btnDeleteCard" @click.prevent="deleteCard(task.id)">
              <span>delete</span>
            </div>
          </div>
        </div>

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
          <b-form-group  label="Description:" >
          <b-form-input v-model="formCreate.description" type="text" required placeholder="description"></b-form-input>
           <b-button type="button" variant="primary" @click="createCard">Submit</b-button>
      <!-- <b-button type="reset" variant="danger">Cancel</b-button> -->
        </b-form>
      </b-modal>
    </div>
<!-- end modal create -->

<!-- modal edit pindah card -->
<!-- end modal edit pindah card-->


  </div>
</template>

<script>
import axios from "axios";
const server = "http://localhost:3000";
export default {
  name: "navbar",
  data() {
    return {
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
        category:'backlog'
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
          console.log(resultAllTask);
        })
        .catch(err => {
          console.log(err);
        });
    },
    createCard(id){
      axios({
        method: "post",
        url:`${server}/task`,
        headers:{
          token: localStorage.token
        },
        data:{
          title:this.formCreate.title,
          description:this.formCreate.description,
          category:this.formCreate.category
        }
      })
      .then(resultCreated=>{
        this.showAllTask()
        this.formCreate.title = null
        this.formCreate.description = null
        this.formCreate.category = null
        this.$bvModal.hide('modal-1')

      })
      .catch(err=>{
        console.log(err)
      })
    },
    deleteCard(id) {
      axios({
        method: "delete",
        url: `${server}/task/${id}`,
        headers: { token: localStorage.token }
      })
        .then(dataDelete => {
          this.showAllTask();
          
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.showAllTask();
  }
};
</script>




<style>
</style>