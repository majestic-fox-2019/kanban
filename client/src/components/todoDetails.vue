<template>
  <div style="text-align: -webkit-center; margin-top:12px;">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Edit Todo</span>
        <!-- <el-button style="float: right; padding: 3px 0" type="text"
          >Edit</el-button
        > -->
        <el-button
          @click.prevent="showEditPage"
          v-if="!editPage"
          size="large"
          style="float: right; padding: 3px"
          type="primary"
          icon="el-icon-edit"
          circle
        ></el-button>
      </div>
      <div v-if="!editPage">
        <h3>
          {{ todoDetail.title }}
        </h3>
        <p>
          {{ todoDetail.content }}
        </p>
      </div>
      <div v-if="editPage">
        <sui-form>
          <sui-form-field>
            <input v-model="todoDetail.title" placeholder="Title" />
          </sui-form-field>
          <sui-form-field>
            <input v-model="todoDetail.content" placeholder="Description" />
          </sui-form-field>
      </div>

      <div>
        <el-row class="mt-3 mr-3 mb-2">
          <el-button
            v-if="editPage"
            style="float: right;"
            size="small"
            type="info"
            class="ml-3"
            @click.prevent="update"
            >Update</el-button
          >
          <el-button
            @click.prevent="hideEditPage"
            style="float: right;"
            size="small"
            type="info"
            >Hide</el-button
          >
          <el-button
            @click.prevent="hapus"
            v-if="editPage"
            style="float: right;"
            size="small"
            type="danger"
            class="mr-2"
            >Delete</el-button
          >
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from 'axios'
import firebase from 'firebase'
export default {
  name: 'editAddTodo',
  data() {
    return {
      userLogin: null,
      editPage: false,
      form: {
        title: ''
      }
    }
  },
  methods: {
    showEditPage() {
      if (this.userLogin.photoURL === this.todoDetail.creatorImg) {
      this.editPage = true
      } else {
        this.open4('you are not allowed to edit, the only one can edit this is the owner')
      }
    },
    hideEditPage() {
      this.$emit('hideEditPage')
    },
    update(){
      if (this.userLogin.photoURL === this.todoDetail.creatorImg) {
        axios({
        method: 'patch',
        url: `https://shielded-escarpment-11569.herokuapp.com/todos/${this.todoDetail.id}`,
        data: {
          title: this.todoDetail.title,
          content: this.todoDetail.content
        }
      })
      .then((result) => {
        this.successON('your update is going successfully')
        this.$socket.emit('updateStatus')
        console.log('update success');
        this.hideEditPage()
      }).catch((err) => {
        console.log(err);
      });
      } else {
        this.open4('update failed, sory:( ....something gone wrong')
      }
    },
    hapus(){
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
                method: 'delete',
                url: `https://shielded-escarpment-11569.herokuapp.com/todos/${this.todoDetail.id}`,
              })
              .then((result) => {
                this.$socket.emit('updateStatus')
                this.$emit('deleteSuccess')
              }).catch((err) => {
                console.log(err);
              });
          }
        })
    },
    open4(message) {
        this.$message({
          showClose: true,
          message: message,
          type: 'error'
        });
      },
      successON(message) {
        this.$notify.success({
          title: 'Success',
          message: message,
          offset: 100
        });
      }
  },
  props: ['todoDetail'],
  created(){
    firebase.auth().onAuthStateChanged(userLogin => {
      this.userLogin = userLogin
    })
  }
}
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
</style>
