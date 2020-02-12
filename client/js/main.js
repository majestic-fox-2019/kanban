let kanban = new Vue({
    el: ".kanban",
    data: {
        "backend_url": "http://localhost:3000",
        "taskCategory": null,
        "input_category_id": "",
        "input_title": "",
        "input_description": ""
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
            
            this.taskCategory[idxCategory-1].tasks.push({
                title       : this.input_title,
                description : this.input_description,
                categoryId  : idxCategory
            });
        },
        updateTask: function(idxCategory) {
            this.taskCategory[idxCategory-1].tasks[this.input_id-1] = {
                "title"       : this.input_title,
                "description" : this.input_description
            }
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
});
