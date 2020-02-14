<template>
    <div>        
        <div class="title">
            {{category.name}}
        </div>
        <div class="cards">
            <div class="card" v-for="task in category.Tasks" :key="task.id">
                <div v-b-modal.modal @click="setModalValue(task)">
                    <div class="card-title">{{ task.title }}</div>
                    <div class="card-content" v-html="task.description">
                        {{ task.description }}
                    </div>
                </div>
            </div>            
        </div>
    </div>
</template>
<script>
    export default {
        props: ["category", "setModalValue"]
    }
</script>
<style>

</style>