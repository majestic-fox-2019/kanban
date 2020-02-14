<template>
  <div>
    <div v-if="openTab" class="chat overflow-auto">
      <b-card :title="chatRoomId.Project.name">
        <form>
          <div v-for="one in isinya" :key="one.id">
            <div class="d-flex">
              <strong>{{one.sender}}:</strong>
              {{one.pesan}}
            </div>
          </div>
          <div class="d-flex">
            <div class="col-10">
              <input type="text" v-model="pesan" />
            </div>
            <div class="col-2">
              <div class="btn btn-primary" type="submit" v-on:click="sendMSG">Send</div>
            </div>
          </div>
        </form>
      </b-card>
    </div>
    <div class="to-click" @click="changeOT">Open chat</div>
  </div>
</template>

<script>
export default {
  name: "chatroom",
  props: ["chatRoomId"],
  data() {
    return {
      openTab: false,
      pesan: "",
      isinya: [],
      username: localStorage.getItem("username")
    };
  },
  methods: {
    changeOT() {
      if (this.openTab == false) {
        this.openTab = true;
      } else {
        this.openTab = false;
      }
    },
    sendMSG() {
      let idPerPesan = Date.now();
      let obj = {
        pesan: this.pesan,
        sender: localStorage.getItem("username"),
        id: idPerPesan
      };
      this.isinya.push(obj);
      this.$socket.emit("kirimPesan", {
        id: this.chatRoomId.ProjectId,
        pesan: this.pesan,
        sender: localStorage.getItem("username")
      });
      this.pesan = "";
    }
  },
  mounted() {
    // console.log(this.chatRoomId, "<ini value di room");
    this.$socket.emit("joinRoom", this.chatRoomId.ProjectId);
    this.$socket.on("pesan-pesannya", value => {
      this.isinya.push(value);
    });
  },
  watch: {
    chatRoomId(oldVal, newVal) {
      // console.log(oldVal, newVal);
      if (oldVal.ProjectId !== newVal.ProjectId) {
        this.isinya = [];
      }
    }
  }
};
</script>

<style scoped>
.to-click {
  background-color: azure;
}
.to-click:hover {
  cursor: pointer;
}
.chat {
  height: 30vh;
}
</style>