<template>
  <div class="card">
    <ol :class="{[name]: isActive}" class="kanban" id="scroll">
      <div class="kanban title" id="title-kanban">
        <h2>{{name}}</h2>
      </div>
      <draggable
        v-model="dragble"
        group="item"
        :sortable="false"
        @end="onEnd"
        :class="{[name]: active}"
      >
        <isiKanban
          @goget="getingKanban"
          v-for="item in kanbanItems"
          :key="item.id"
          @updateKanban="editedKanban"
          :nameHeader="name"
          :item="item"
        ></isiKanban>
      </draggable>
      <div v-if="name === 'back-log'" class="actions">
        <button data-toggle="modal" data-target="#addKanban" class="addbutt">Add new</button>
      </div>
    </ol>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import isiKanban from "../components/isiKanban";
import draggable from "vuedraggable";
export default {
  props: ["name", "kanbanItems"],
  data() {
    return {
      isActive: true,
      items: null,
      active: true,
      dragble: this.drag
    };
  },
  components: {
    isiKanban,
    draggable
  },
  computed: {
    drag: function() {
      return this.kanbanItems;
    }
  },
  methods: {
    editedKanban(data) {
      this.$emit("kanbanGoEdit", data);
    },
    onEnd(evt) {
      const id = evt.item.attributes.id.value;
      const value = evt.to.attributes.class.value;
      return axios({
        url: `http://localhost:3000/kanbans/${id}`,
        method: "PUT",
        headers: {
          token: localStorage.getItem("token")
        },
        data: {
          category: value
        }
      })
        .then(() => {
          this.$socket.emit("drag-kanban");
          this.$emit("getKanban");
        })
        .catch(({ response }) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: response.data
          });
          this.$emit("getKanban");
        });
    },
    getingKanban() {
      this.$emit("getKanban");
    }
  }
};
</script>

<style scoped>
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

.card {
  margin-top: 50%;
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
  text-transform: uppercase;
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

button.addbutt {
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
button {
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

ol.kanban.back-log {
  border-top: 5px solid rgb(255, 0, 0);
}

ol.kanban.done {
  border-top: 5px solid rgb(136, 255, 0);
}

ol.kanban.to-do {
  border-top: 5px solid rgb(0, 225, 255);
}

ol.kanban.doing {
  border-top: 5px solid rgb(255, 196, 0);
}

#title-kanban {
  z-index: 98;
  position: sticky;
  background-color: white;
}

#scroll::-webkit-scrollbar {
  width: 5px;
  background-color: #f5f5f5;
}

#scroll::-webkit-scrollbar-thumb {
  background-color: #8a8a8ab2;
}

ol.kanban {
  overflow-y: scroll;
  width: 100%;
  margin: 1.5%;
  max-width: 250px;
  min-width: 136px;
  display: inline-block;
  vertical-align: top;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  flex-direction: column;
  min-height: 550px;
  max-height: 550px;
  position: relative;
  background: white;
  padding: 0 1em 1em;
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
  border-radius: 2px;
  box-sizing: border-box;
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

.card-item {
  display: block;
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
</style>