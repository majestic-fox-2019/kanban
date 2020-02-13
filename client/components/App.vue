<template>
    <div class="kanban">               
        <b-modal 
            id="modal" 
            title="Task"
            @hidden="resetModal"
            @ok="handleOk"
        >
            <input type="hidden" v-model="input_category_id">
            <div class="form-group">
            <label>Title</label>
            <input v-model="input_title" type="text" class="form-control" placeholder="Input Task's Title">
            </div>
            <div class="form-group">
                <label>Description</label>
                <textarea v-model="input_description" class="form-control" placeholder="Input Task's Description"></textarea>
            </div>  
        </b-modal>
        
        <div :id="category.name" class="col-3" v-for="category in taskCategory" :key="category.id">
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
            <div class="footer">
                <button v-b-modal.modal @click="setModalValue({categoryId: category.id})">Add a task</button> 
            </div>
        </div>        
    </div>
</template>
<script>
    import TaskCategory from './TaskCategory.vue';
    export default {
        components : {
            'task-category': TaskCategory
        },
        data: function(){
            return {
                "backend_url": "http://localhost:3000",
                "taskCategory": null,
                "input_category_id": "",
                "input_title": "",
                "input_description": ""
            }
        },
        methods: {
            getTasks: function(){
                fetch(`${this.backend_url}/projects`)
                .then(res => {
                    return res.json();  
                })
                .then(data => {
                    this.taskCategory = data
                })
                .catch(err => console.log(err));
            },
            addTask: function(idxCategory) {
                let objAdd = {
                    title: this.input_title,
                    description: this.input_description,
                    UserId: 1,
                    ProjectId: idxCategory
                };

                fetch(`${this.backend_url}/tasks`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(objAdd)
                })  
                .then(res => {
                    console.log(res);
                    this.getTasks();
                })
                .catch(err => {
                    console.log(err);
                })            
            },
            updateTask: function(idxCategory) {
                let objEdit = {
                    title: this.input_title,
                    description: this.input_description,
                    UserId: 1,
                    ProjectId: idxCategory
                };

                fetch(`${this.backend_url}/tasks/${this.input_id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(objEdit)
                })  
                .then(res => {
                    console.log(res);
                    this.getTasks();
                })
                .catch(err => {
                    console.log(err);
                })
            },
            resetModal: function() {
                this.input_category_id  = null;
                this.input_id           = null;
                this.input_title        = "";
                this.input_description  = "";
            },
            setModalValue: function(task){
                this.input_category_id  = task.categoryId;
                this.input_id           = task.id;
                this.input_title        = task.title;
                this.input_description  = task.description;
            },
            handleOk: function() {
                if (this.input_id == undefined) {
                    this.addTask(this.input_category_id);
                }else{
                    this.updateTask(this.input_category_id);
                }
            }
        },
        beforeMount() {
            this.getTasks();
        }
    }
</script>
<style>

</style>