<template>
  <div class="container-fluid">
    <div class="row mt-5">
      <div class="col">
        <h2
          class="text-center p-2"
          style="background-color: rgb(238, 190, 87); border-radius:10px"
        >Back-Log</h2>
        <div class="list-gro up-item" v-for="(element, index) in backlog" :key="index">
          <cards @fetch="fetchData()" :item="element"></cards>
        </div>
        <div style="height: 80vh; overflow:scroll">
          <b-button v-b-modal.modal-1>
            <i class="fas fa-plus"></i> Add New Task
          </b-button>

          <b-modal id="modal-1" title="Create" hide-footer>
            <form>
              <div class="form-group">
                <label for="exampleInputEmail1">Title</label>
                <input
                  v-model="title"
                  type="text"
                  class="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <button @click.prevent="createTask" type="button" class="btn btn-primary">Submit</button>
            </form>
          </b-modal>
        </div>
      </div>
      <div class="col">
        <h2 class="text-center p-2" style="background-color: yellow; border-radius:10px">TODO</h2>
        <draggable
          class="todo"
          :list="todo"
          group="people"
          @change="log"
          @end="onEnd"
          style="height: 80vh; overflow:scroll"
        >
          <div
            class="list-gro up-item"
            v-for="(element, index) in todo"
            :key="index"
            style="overflow:auto"
          >
            <cards @fetch="fetchData()" :item="element"></cards>
          </div>
        </draggable>
      </div>
      <div class="col">
        <h2 class="text-center p-2" style="background-color: orange; border-radius:10px">Doing</h2>
        <draggable
          class="doing"
          :list="doing"
          group="people"
          @change="log"
          @end="onEnd"
          style="height: 80vh; overflow:scroll"
        >
          <div class="list-gro up-item" v-for="(element, index) in doing" :key="index">
            <cards @fetch="fetchData()" :item="element"></cards>
          </div>
        </draggable>
      </div>
      <div class="col">
        <h2 class="text-center p-2" style="background-color: green; border-radius:10px">Done</h2>
        <draggable
          class="done"
          :list="done"
          group="people"
          @change="log"
          @end="onEnd"
          style="height: 80vh; overflow:scroll"
        >
          <div class="list-gro up-item" v-for="(element, index) in done" :key="index">
            <cards @fetch="fetchData()" :item="element"></cards>
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import cards from "../components/cards";
import axios from "axios";
import Navbar from "../components/navbar";
export default {
  data() {
    return {
      backlog: [],
      todo: [],
      doing: [],
      done: [],
      project: [],
      title: "",
      description: ""
    };
  },
  components: {
    draggable,
    cards
  },
  created() {
    this.fetchData();
  },
  mounted() {
    const category = {
      "back-log": this.backlog,
      todo: this.todo,
      doing: this.doing,
      done: this.done
    };

    this.$socket.on("created", () => {
      this.fetchData();
    });

    this.$socket.on("accepted", () => {
      this.fetchData();
    });

    this.$socket.on("declined", () => {
      this.fetchData();
    });

    this.$socket.on("moved", data => {
      // category;
      this.fetchData();
    });

    this.$socket.on("deleted", () => {
      this.fetchData();
    });

    this.$socket.on("updated", () => {
      this.fetchData();
    });
  },
  methods: {
    createTask() {
      axios({
        method: "post",
        url: `http://localhost:3000/tasks`,
        headers: {
          access_token: localStorage.getItem("access_token")
        },
        data: {
          title: this.title
        }
      })
        .then(({ data }) => {
          // this.fetchData();
          this.$bvModal.hide("modal-1");
          this.$socket.emit("create");
        })
        .err(err => {
          console.log(err.response.data);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${err.response.data}`
          });
        });
    },
    fetchData() {
      this.backlog = [];
      this.doing = [];
      this.done = [];
      this.todo = [];
      axios({
        method: "get",
        url: `http://localhost:3000/tasks`,
        headers: {
          access_token: localStorage.getItem("access_token")
        }
      })
        .then(({ data }) => {
          data.forEach(el => {
            if (el.category === "back-log") {
              this.backlog.push(el);
            } else if (el.category === "todo") {
              this.todo.push(el);
            } else if (el.category === "doing") {
              this.doing.push(el);
            } else {
              this.done.push(el);
            }
          });
        })
        .catch(err => {
          console.log(err.response.data);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `${err.response.data}`
          });
        });
    },
    log: function(evt) {
      this.project.push(evt);
    },
    onEnd: function(evt) {
      if (this.project.length > 0 && this.project[0].added) {
        let id = this.project[0].added.element.id;
        let data = evt.to;
        let newData = data.attributes.class;
        let category = newData.value;
        axios({
          method: "patch",
          url: `http://localhost:3000/tasks/${id}`,
          headers: {
            access_token: localStorage.getItem("access_token")
          },
          data: {
            category
          }
        })
          .then(({ data }) => {
            this.project = [];
            this.$socket.emit("move");
          })
          .catch(err => {
            this.project = [];
            this.$socket.emit("move");
            console.log(err.response.data);
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: `${err.response.data}`
            });
          });
      }
    }
  }
};
</script>

<style>
</style>