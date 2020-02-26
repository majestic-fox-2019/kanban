<template>
    <div>    
            <div class ="cardContainer" :key='i' v-for="(task,i) in tasks"  >
                <card :category="category" :index="i" :task="task" :tasks="tasks" @showList="$emit('showListAll')"></card>
            </div>
    </div>
</template>
<script>
import card from './card'
export default {
    name:"cardContainer",
    props:['tasks','category'],
    components:{
        card
    }
}
</script>
<style>

</style>