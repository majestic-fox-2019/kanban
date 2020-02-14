<template>
    <div>
        <div class ="listKanban">
            <div :key='i' v-for="(cat,i) in category">
            <div class = "kanbanContainer" >
                        <div class="title">
                            <h4>{{cat}}</h4>
                        </div>
                        <div class ="containerKartu">
                        <cardContainer :tasks="tasks" :category="`${cat}`" @showListAll="$emit('showList')">
                        </cardContainer>
                        </div>
                        <div class="addTask">
                            <p v-on:click = "getCategory(`${cat}`)" data-toggle="modal" data-target="#addModal" >  <i class="fas fa-plus" ></i> add Task</p>
                        </div>
            </div>
            </div>
        </div>
        <!-- modal add -->
        <div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="exampleModalCenterTitle">Add Modal</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
                </div>
                <div class="modal-body">
                    <form v-on:submit.prevent="addTask">
                        <div class="form-group">
                        <label for="exampleInputEmail1">Title</label>
                        <input type="text" v-model="form.title" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Title">
                        </div>
                        <div class="form-group" >
                        <label for="exampleInputPassword1">Description</label>
                        <input type="text" v-model="form.description" class="form-control" id="Description" placeholder="description">
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
            </div>
        </div>

       
    </div>
</template>
<script>
import cardContainer from './cardCategory'
import axios from 'axios'
const server = `https://kanbatte.herokuapp.com`
export default {
        
        props:['category','tasks'],
        data:function(){
            return{
                form:{title:null,description:null},
                categoryIndex:null
            }
        },
        components:{
            cardContainer
        },
        methods:{
        getCategory:function(category){
            this.categoryIndex = category
            console.log(this.categoryIndex)
        },
        addTask:function(e){
            axios({
                method:"POST",
                headers:{token:localStorage.token},
                url:`${server}/tasks`,
                data:{
                    title:this.form.title,
                    description:this.form.description,
                    category:this.categoryIndex
                }
            })
            .then(data=>{
                console.log(data)
                this.$parent.showList()

            })
            .catch(err=>{
                console.log(err)
            })
        }
        }
}
</script>
<style >

</style>