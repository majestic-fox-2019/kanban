<template>
    <div style="display: flex;">
        <div :id="category.name" class="col-3" v-for="category in taskCategory" :key="category.id">
            <task-card
                :category="category"
                :setModalValue="setModalValue"
            >
            </task-card>
            <div class="footer">
                <button v-b-modal.modal @click="setModalValue({ProjectId: category.id})">Add a task</button> 
            </div>
        </div>     
    </div>
    <!-- <slot></slot> -->
</template>
<script>
    import TaskCard from './TaskCard.vue';

    export default {
        components: {
            'task-card': TaskCard
        },
        props: ["taskCategory", "setModalValue"],
        data(){
            return {

            }
        }
    }
</script>
<style>

</style>