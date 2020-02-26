<template>
    <div>
        <layout-header :backend_url="backend_url">

        </layout-header>
        <div
            v-if="!isLogin"    
        >   
            <h1 class="text-center text-white">You need to login to access the feature!</h1>
        </div>
        <div 
            v-if="isLogin"
            class="kanban"
        >               
            <modal-task 
                :dataModal="dataModal"
                :handleOk="handleOk"
            >
            </modal-task>
            <task-category
                :taskCategory="taskCategory"
                :setModalValue="setModalValue"
                :handleDelete="handleDelete"
                :arrCategoryNames="arrCategoryNames"
                :handleChangeStatus="handleChangeStatus"
            >
            </task-category>               
        </div>
    </div>
</template>
<script>
    import Header from './components/Header.vue';
    import TaskCategory from './components/TaskCategory.vue';
    import ModalTask from './components/ModalTask.vue';
    // import ModalLogin from './components/ModalLogin.vue';

    export default {
        components : {
            'layout-header': Header,
            'modal-task': ModalTask,
            'task-category': TaskCategory
            // 'modal-login': ModalLogin
        },
        data: function(){
            return {
                "backend_url"       : "http://localhost:3000",
                "taskCategory"      : null,
                "dataModal"         : {},
                "arrCategoryNames"  : [],
                "isLogin"           : localStorage.getItem("token")
            }
        },
        methods: {
            getTasks: function(){
                fetch(`${this.backend_url}/projects`)
                .then(res => {
                    return res.json();  
                })
                .then(data => {
                    this.taskCategory = data;

                    let tempCategories = [];
                    data.forEach(cat => {
                        tempCategories.push({id: cat.id, name: cat.name});
                    });
                    this.arrCategoryNames = tempCategories;
                })
                .catch(err => console.log(err));
            },
            addTask: function(objData) {
                const {ProjectId, id, title, description} = objData;
                let objAdd = {title,description,UserId: 1,ProjectId};

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
            updateTask: function(objData) {
                const {ProjectId, id, title, description} = objData;
                let objEdit = {title,description,UserId: 1,ProjectId};
                fetch(`${this.backend_url}/tasks/${id}`, {
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
                console.log(task);
                const {ProjectId, id, title, description} = task;
                this.dataModal = {ProjectId, id, title, description};
            },
            handleOk: function(objData) {
                if (objData.id == undefined) {
                    this.addTask(objData);
                }else{
                    this.updateTask(objData);
                }
            },
            handleDelete: function(objData) {
                if(confirm(`are you sure you want to delete ${objData.title}?`)) {
                    fetch(`${this.backend_url}/tasks/${objData.id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })  
                    .then(res => {
                        console.log(res);
                        this.getTasks();
                    })
                    .catch(err => {
                        console.log(err);
                    })  
                }
            },
            handleChangeStatus: function(event, objData){
                if(event.target.value) {
                    fetch(`${this.backend_url}/tasks/${objData.id}`, {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ProjectId: event.target.value})
                    })  
                    .then(res => {
                        console.log(res);
                        this.getTasks();
                    })
                    .catch(err => {
                        console.log(err);
                    })
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