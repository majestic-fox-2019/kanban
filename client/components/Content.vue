<template>
  <div class="content" :style="{display: pageContent ? 'block' : 'none'}">
            <nav>
            <div class="container-fluid">
                <div class="navbar-header">
                    <a class="navbar-brand" href="#" ><div style="font-family: 'Quicksand', sans-serif;">KANBAN</div ></a>
                </div>
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="/" class="glyphicon glyphicon-log-out" @click.prevent="logout()"> Logout</a></li>
                </ul>
            </div>
            </nav>
            <main >
                <div class="kanban" v-for="category in categories" v-bind:key="category.id">
                    <div class="category">{{category.name}}</div>
                    <div class="item">
                        <div class="title" v-for="task in category.Tasks" v-bind:key="task.id">
                            <div>
                                <div class="title-button">
                                     <i class="material-icons" @click.prevent="update(task)" v-bind:key="task.id">edit</i>
                                     <i class="material-icons" @click.prevent="alertDisplay(task)">delete</i>
                                </div>
                                <p>{{task.title}}</p>
                            </div>
                        </div>
                    </div>
                    <AddTask v-bind:task="task" v-bind:CategoryId="category.id"></AddTask>
                </div>
            </main>
        </div>  
</template>

<script>
import axios from 'axios'
import AddTask from './AddTask'
export default {
    name:"Content",
    components:{AddTask},
    props:["categories", "pageContent"],
    data() {
    return{
        task: null,
        }
    },
    methods:{
        alertDisplay(task){
            this.$swal({
            title: 'Are you sure?',
            text: `Task ${task.title} will be remove?`,
            type: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            showCloseButton: true,
            showLoaderOnConfirm: true
        }).then((result) => {
          if(result.value) {
              axios
              .delete(`${process.env.BASE_URL}/tasks/${task.id}`)
              .then(data =>{
                  this.$swal('Deleted', 'You successfully deleted this file', 'success')
                  this.$parent.getCategory()
              })
          } else {
            this.$swal('Cancelled', 'Your taks is still in', 'info')
          }
        })
        },
        logout(){
            this.$parent.logout()
        },
        update(task){            
            this.$swal.fire({
            title: 'Update Task title',
            input: `text`,
            inputAttributes: {
                autocapitalize: 'off'
            },
            showCancelButton: true,
            confirmButtonText: 'Save',
            showLoaderOnConfirm: true,
            preConfirm: (titleTask) => {
                return axios
                .put(`${process.env.BASE_URL}/tasks/${task.id}`, {
                    title:titleTask
                })
                .then(response => {
                    if (!response) {
                    throw new Error(response.statusText)
                    }
                    this.$swal('Update', 'You successfully update this task', 'success')
                    this.$parent.getCategory()

                })
                .catch(error => {
                    this.$swal.showValidationMessage(
                    `Request failed: ${error}`
                    )
                })
            }
            })
        }
    },
    created(){
        
    }

}
</script>


<style>

</style>