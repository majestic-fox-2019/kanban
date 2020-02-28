<template>
  <div>
    <navbar @statusLoginFalse="statusLoginFalse" :whatStatusLogin="whatStatusLogin"></navbar>
    <loginRegister
      @showRegistrasi="goRegister"
      @showLogin="goLogin"
      @statusLoginTrue="statusLoginTrue"
      @loginTrue="statusLoginTrue"
      :whatShowLoginRegister="whatShowLoginRegister"
      :whatStatusLogin="whatStatusLogin"
    ></loginRegister>
    <myKanban
      :kanbans="kanbans"
      @getKanban="getKanban"
      @kanbanGoEdit="toEditKanban"
      v-if="whatStatusLogin"
    ></myKanban>
    <mainPage @getKanban="getKanban" :kanbanToEdit="kanbanToEdit"></mainPage>
  </div>
</template>

<script>
import navbar from "./components/navbar";
import mainPage from "./views/mainPage";
import loginRegister from "./views/loginRegister";
import myKanban from "./components/myKanban";
import Swal from "sweetalert2";
import axios from "axios";
export default {
  data() {
    return {
      kanbanToEdit: { editTitle: "", editDescription: "", editAssignTo: "" },
      isActive: true,
      whatStatusLogin: false,
      whatShowLoginRegister: "login",
      kanbans: [
        {
          name: "back-log",
          items: []
        },
        {
          name: "to-do",
          items: []
        },
        {
          name: "doing",
          items: []
        },
        {
          name: "done",
          items: []
        }
      ]
    };
  },
  components: {
    navbar,
    loginRegister,
    mainPage,
    myKanban
  },
  created() {
    if (localStorage.getItem("token")) {
      this.whatStatusLogin = true;
      this.getKanban();
    } else {
      this.whatStatusLogin = false;
    }
  },
  methods: {
    toEditKanban(payload) {
      this.kanbanToEdit = payload;
    },
    goRegister() {
      this.whatShowLoginRegister = "register";
    },
    goLogin() {
      this.whatShowLoginRegister = "login";
    },
    statusLoginTrue() {
      this.whatStatusLogin = true;
      this.getKanban();
    },
    statusLoginFalse() {
      this.whatStatusLogin = false;
    },
    getKanban() {
      this.kanbans = [
        {
          name: "back-log",
          items: []
        },
        {
          name: "to-do",
          items: []
        },
        {
          name: "doing",
          items: []
        },
        {
          name: "done",
          items: []
        }
      ];
      axios({
        url: "http://localhost:3000/kanbans",
        method: "GET",
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.kanbans = [
            {
              name: "back-log",
              items: []
            },
            {
              name: "to-do",
              items: []
            },
            {
              name: "doing",
              items: []
            },
            {
              name: "done",
              items: []
            }
          ];
          data.forEach(el => {
            switch (el.category) {
              case "back-log":
                this.kanbans[0].items.push(el);
                break;
              case "to-do":
                this.kanbans[1].items.push(el);
                break;
              case "doing":
                this.kanbans[2].items.push(el);
                break;
              case "done":
                this.kanbans[3].items.push(el);
                break;
            }
          });
        })
        .catch(err => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: err.responseJSON.message
          });
        });
    }
  },
  mounted() {
    this.$socket.on("added-kanban", () => {
      this.getKanban();
    });
    this.$socket.on("edited-kanban", () => {
      this.getKanban();
    });
    this.$socket.on("deleted-kanban", () => {
      this.getKanban();
    });
    this.$socket.on("gonext-kanban", () => {
      this.getKanban();
    });
    this.$socket.on("goback-kanban", () => {
      this.getKanban();
    });
    this.$socket.on("draged-kanban", () => {
      this.getKanban();
    });
  }
};
</script>

<style scoped>
.card {
  margin-top: 5%;
  margin-left: 5.3%;
  display: block;
  border: none;
}
</style>