<template>
   <div class="item-foot">
        <form method="POST" v-on:submit.prevent="add(CategoryId, title)">
            <input type="text" v-model="title" />
        </form>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    name:"AddTask",
    props:["task", "CategoryId"],
    data() {
        return{
            title: null,
        }
    },
    methods:{
        add(id, title){
            axios
            .post(`${process.env.BASE_URL}/tasks`,{
                title:title, CategoryId:id
            })
            .then(data =>{
                // console.log(data);
                    this.title = null
                    this.$parent.$parent.getCategory()
                Swal.fire(
                'Task succes add!',
                `Task ${data.title} succesfull added`,
                'success'
                )
            })
            .catch(err =>{
                console.log(err)
            })
        }
    }, 

}
</script>

<style>

</style>