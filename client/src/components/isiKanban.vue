<template>
  <li v-animate-css="'lightSpeedIn'" :id="item.id" class="card-item">
    <div class="title-card">
      <div>
        <button
          class="edit-btn"
          data-toggle="modal"
          data-target="#editKanban"
          @click="checkKanban(item.id)"
        >
          <i class="far fa-edit"></i>
        </button>
      </div>
      <h3 class="title card-handle" id="titleCard">{{item.title}}</h3>
    </div>
    <div class="text">{{item.description}}</div>
    <div class="icon-action">
      <button @click="back(item.id)">
        <i class="fas fa-arrow-circle-left"></i>
      </button>
      <button @click="remove(item.id)">
        <i class="fas fa-trash"></i>
      </button>
      <button @click="next(item.id)">
        <i class="fas fa-arrow-circle-right"></i>
      </button>
    </div>
    <div class="actions" id="created-by">
      <p>assign to: {{item.assignTo}}</p>
    </div>
  </li>
</template>

<script>
import Swal from "sweetalert2";
import axios from "axios";
export default {
  data() {
    return {
      isActive: true,
      idDrag: []
    };
  },
  props: ["nameHeader", "item"],
  methods: {
    remove(id) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      })
        .then(remove => {
          if (remove.value) {
            axios({
              url: `http://localhost:3000/kanbans/${id}`,
              method: "DELETE",
              headers: {
                token: localStorage.getItem("token")
              }
            })
              .then(() => {
                Swal.fire("Deleted!", "Your file has been deleted.", "success");
                this.$socket.emit("delete-kanban");
                this.$emit("goget");
              })
              .catch(({ response }) => {
                Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: response.data
                });
              });
          }
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.data
          });
        });
    },
    back(id) {
      let backHeader;
      if (this.nameHeader === "done") {
        backHeader = "doing";
      } else if (this.nameHeader === "doing") {
        backHeader = "to-do";
      } else if (this.nameHeader === "to-do") {
        backHeader = "to-do";
      }
      axios({
        url: `http://localhost:3000/kanbans/${id}`,
        method: "PUT",
        headers: {
          token: localStorage.getItem("token")
        },
        data: {
          category: backHeader
        }
      })
        .then(() => {
          this.$socket.emit("back-kanban");
          this.$emit("goget");
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.data
          });
        });
    },
    next(id) {
      let nextHeader;
      if (this.nameHeader === "back-log") {
        nextHeader = "to-do";
      } else if (this.nameHeader === "to-do") {
        nextHeader = "doing";
      } else if (this.nameHeader === "doing") {
        nextHeader = "done";
      } else if (this.nameHeader === "done") {
        nextHeader = "lenyap";
      }
      axios({
        url: `http://localhost:3000/kanbans/${id}`,
        method: "PUT",
        headers: {
          token: localStorage.getItem("token")
        },
        data: {
          category: nextHeader
        }
      })
        .then(() => {
          this.$socket.emit("next-kanban");
          this.$emit("goget");
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.data
          });
        });
    },
    checkKanban(id) {
      axios({
        url: `http://localhost:3000/kanbans/${id}`,
        method: "GET",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.$emit("updateKanban", data);
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.data
          });
        });
    }
  }
};
</script>

<style lang="scss" scoped>
%button-cool {
  align-items: center;
  background-color: #eeeeee;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  border: 1px solid #ccc;
  border-radius: 2px;
  color: #607d8b;
  position: relative;
  margin: 0;
  min-width: 44px;
  padding: 10px 16px;
  display: inline-block;
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1;
  overflow: hidden;
  outline: none;
  cursor: pointer;
  text-decoration: none;
}

body {
  font-family: Sans-serif;
  background-color: #e0e0e0;
}

h3 {
  margin-top: -2px !important;
  margin-left: 10px !important;
}

menu {
  position: absolute;
  right: 16px;
  top: 16px;
}

#titleCard {
  margin-bottom: 3px;
}

.edit-btn {
  border-radius: 25px;
  min-width: 25px !important;
  max-width: 25px !important;
  max-height: 22px !important;
  padding: 0;
  margin-bottom: 5px;
}
.card {
  margin-top: 5%;
  margin-left: 5.3%;
  display: block;
  border: none;
}

.icon-action {
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
}

.title-card {
  display: flex;
  margin-left: 15px;
}

h2,
h1,
button {
  margin-left: 5px;
  font-family: monospace;
}

h2 {
  color: #607d8b;
  margin-block-start: 0.1em;
  margin-block-end: 0.2em;
  font-size: 28px;
  font-weight: bold;
}

.card-item:hover,
button:hover {
  color: #00838f;
  will-change: box-shadow;
  box-shadow: 0 5px 6px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -6px rgba(0, 0, 0, 0.2),
    2px 5px 3px 0 rgba(0, 0, 0, 0.12);
}

button {
  @extend %button-cool;
  .addbutt {
    background-color: white;
    color: #00838f;
    width: 100%;
  }
  .list > button.addbutt {
    max-width: 330px;
  }
  button:active,
  button:down,
  button:focus {
    box-shadow: 0 0 0 0, 0 0 0 0 rgba(0, 0, 0, 0.2), 0 0 0 0 rgba(0, 0, 0, 0.12);
    color: #00838f;
  }
}

ol {
  .kanban.back-log {
    border-top: 5px solid rgb(0, 225, 255);
  }
  .kanban.done {
    border-top: 5px solid rgb(255, 0, 0);
  }
  .kanban.to-do {
    border-top: 5px solid rgb(255, 196, 0);
  }
  .kanban.doing {
    border-top: 5px solid rgb(136, 255, 0);
  }
  .kanban {
    overflow-y: scroll;
    width: 25%;
    margin: 1.5%;
    max-width: 250px;
    min-width: 120px;
    display: inline-block;
    vertical-align: top;
    box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
      0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    flex-direction: column;
    min-height: 550px;
    max-height: 550px;
    position: relative;
    background: white;
    padding: 0 1em 1em;
  }
}

#title-kanban {
  z-index: 1;
  background-color: white;
}

#scroll::-webkit-scrollbar {
  width: 5px;
  background-color: #f5f5f5;
}

#scroll::-webkit-scrollbar-thumb {
  background-color: #8a8a8ab2;
}

.card-item {
  display: block;
  position: relative;
  list-style: none;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  min-height: 48px;
  font-size: 16px;
  min-height: 120px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-sizing: border-box;
  margin: 5px 0;
  padding: 5px 0px;
  color: rgba(116, 112, 112, 0.801);
  text-decoration: none;
  font-weight: bold;
  border: 1px solid #ccc;
  background: #fafafa;
  -webkit-border-radius: 3px;
  border-radius: 3px;
  box-sizing: border-box;
}

.card-item:hover {
  background: rgba(165, 165, 165, 0.157);
}

.title {
  align-self: flex-end;
  color: inherit;
  display: flex;
  font-size: 20px;
  overflow: hidden;
  transform-origin: 149px 48px;
  margin: 0;
  position: sticky;
  top: 0;
}

.text {
  color: grey;
  border-top: 1px solid;
  font-size: 1rem;
  font-weight: 400;
  line-height: 18px;
  overflow: hidden;
  padding: 16px;
  width: 90%;
}

#created-by {
  margin-left: 15px;
}

.actions {
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  font-size: 10px;
  line-height: normal;
  width: 100%;
  color: #b0bec5;
  box-sizing: border-box;
}
</style>