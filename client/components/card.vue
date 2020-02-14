<template>
    <div>
        <div class ="card"   v-if="task.category === category ">
                    <div class ="cardTitle">
                        <h5>{{task.title}}</h5>
                    </div>
                    <div class ="description">
                        <p>{{task.description}}</p>
                    </div>
                    <div v-if="UserId == task.UserId" class ="tombol">
                        <div class="kiri col">
                        <i v-if="category != `Backlog`"  style="cursor: pointer;" v-on:click="changeStatus(true);update(task)" class="fas fa-arrow-left"></i>
                        </div>
                        <div class="tengah col">
                            <i class="far fa-trash-alt" style="cursor: pointer;" v-on:click="deleteTask(task.id)"></i>
                        </div>
                        <div class="kanan col">
                        <i v-if="category != `Completed`" class="fas fa-arrow-right" v-on:click="changeStatus(false);update(task)" style="cursor: pointer;"></i>
                        </div>
                        
                    </div>
                
        </div>
        
    </div>
</template>
<script>
import axios from 'axios'
const server = `https://kanbatte.herokuapp.com`
export default {
    name:"name",
    props:['category','task','index'],
    data:function(){
        return{
            getCategory:null,
            back:false,
            UserId : localStorage.UserId
            }
        },
    methods:{
        update(task){
            console.log(task)
            this.checkCategory(task.category)
            // console.log(task.status)
            axios({
                method:"put",
                headers:{token:localStorage.token},
                url:`${server}/tasks/${task.id}`,
                data:{
                    title:task.status,
                    description:task.description,
                    category:this.getCategory
                }
            })
            .then(data=>{
                console.log(data)
                this.$emit('showList')
            })
            .catch(err=>{

            })
        },
        changeStatus(status){
            if(status == true){
                this.back = true
            }
            else{
                this.back = false
            }
        },
        deleteTask:function(id){
            axios({
                method:"delete",
                headers:{token:localStorage.token},
                url:`${server}/tasks/${id}`
            })
            .then(data=>{
                this.$emit('showList')
                console.log(data)
            })
            .catch(err=>{
                console.log(err)
            })
        },
        checkCategory(category){
            // this.status = status
            if(this.back == true){
                if(category == "Todo"){
                    this.getCategory = "Backlog"
                }
                else if(category =="Done"){
                    this.getCategory = "Todo"
                }
                else if(category == "Completed"){
                    this.getCategory = "Done"
                }
            }
            else{
                if(category == "Backlog"){
                    this.getCategory = "Todo"
                }
                else if(category =="Todo"){
                    this.getCategory = "Done"
                }
                else if(category == "Done"){
                    this.getCategory = "Completed"
                }
            }
            
        }
    }
}
</script>
<style >

</style>