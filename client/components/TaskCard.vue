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
                <hr>
                <div>
                    <p class="h4 text-center">
                        <b-icon icon="pencil" v-b-modal.modal @click="setModalValue(task)"></b-icon>
                        <b-icon icon="trash" @click="setModalValue(task); handleDelete(task);"></b-icon>
                    </p>
                    <hr/>
                    <select class="form-control" style="width: 100%" @change="handleChangeStatus($event, task)">
                        <option value="">-- [Change Status] --</option>
                        <option :key="cat.id" :value="cat.id" v-for="cat in filterCategoryOptions">{{cat.name}}</option>
                    </select>
                </div>
            </div>            
        </div>
    </div>
</template>
<script>
    export default {
        props: [
            "category", 
            "setModalValue", 
            "handleDelete", 
            "arrCategoryNames",
            "handleChangeStatus"
        ],
        computed: {
            filterCategoryOptions: function() {
                return this.arrCategoryNames.filter(cat => {
                    return cat.name !== this.category.name
                });
            }
        }
    }
</script>
<style>

</style>