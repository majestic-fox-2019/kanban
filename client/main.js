let app = new Vue({
    el : '#app',
    data : {
        message : 'Hello vue!',
        backlogs : [],
        todos : [],
        doings : [],
        dones : [],
        displayForm : false,
        title : '',
        category : '',
        status : '',
        logged : false,
        email : '',
        password : '',
        editButton : false,
        id : ''
    },
    methods : {
        login : function(){
            let body = {
                email : this.email,
                password : this.password
            }
            axios({
                url : 'http://localhost:3000/user/login',
                method : 'post',
                data : body 
            })
            .then(({data})=>{
                console.log(data)
                localStorage.token = data
                this.logged = true
            })
            .catch(({response})=>{
                console.log(response)
            })
        },
        showForm : function () {
            this.displayForm = true
            this.editButton = false
        },
        cancelForm : function () {
                this.displayForm = false
                this.title = '',
                this.category = '',
                this.status = ''
        },
        submitTask: function (){
            let body = {
                title : this.title,
                category : this.category,
                status : this.status
            }
            console.log(body)
            axios({
                url : 'http://localhost:3000/task/',
                method : 'post',
                headers : {
                    token : localStorage.token
                },
                data : body,
            })
            .then(({data})=>{
                console.log(data)
                this.getTasks()
                this.displayForm = false
                this.title = '',
                this.category = '',
                this.status = '',
                this.updateButton = true
            })
            .catch(err => {
                console.log(err)
            })
        },
        getTasks : function(){
            axios({
                url : 'http://localhost:3000/task/',
                method : 'get',
                headers : {
                    token : localStorage.token
                },
            })
            .then(({data})=>{
                //empty the list first
                this.backlogs = []
                this.todos = []
                this.doings = []
                this.dones = []
    
                data.forEach(task => {
                    switch(task.status){
                        case 'backlog' : 
                            this.backlogs.push(task)
                            break
                        case 'todo' : 
                            this.todos.push(task)
                            break
                        case 'doing' : 
                            this.doings.push(task)
                            break
                        case 'done' : 
                            this.dones.push(task)
                            break
                    }
                });
            })
        },
        deleteTask(id){
            console.log('masuk delete')
            axios({
                url : 'http://localhost:3000/task/'+id,
                method : 'delete',
                headers : {
                    token : localStorage.token
                }
            })
            .then(({data})=>{
                console.log(data)
                if(data > 0){
                    this.getTasks()
                } else {
                    console.log('delete unsuccessful')
                    console.log(data)
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        showEditForm(id){
            axios({
                url : 'http://localhost:3000/task/'+id,
                method : 'get',
                headers : {
                    token : localStorage.token
                },
            })
            .then(({data})=>{
                console.log(data)
                this.id = data.id
                this.title = data.title
                this.category = data.category
                this.status = data.status
                this.displayForm = true
                this.editButton = true
            })
            .catch(err => {
                console.log(err)
            })
        },
        editTask : function (){
            let body = {
                title : this.title,
                category : this.category,
                status : this.status
            }
            console.log(body)
            axios({
                url : 'http://localhost:3000/task/'+this.id,
                method : 'put',
                headers : {
                    token : localStorage.token
                },
                data : body,
            })
            .then(({data})=>{
                console.log(data)
                this.getTasks()
                this.displayForm = false
                this.title = '',
                this.category = '',
                this.status = '',
                this.updateButton = true
            })
            .catch(err => {
                console.log(err)
            })
        },
        goLeft(id){
            axios({
                url : 'http://localhost:3000/task/'+id,
                method : 'get',
                headers : {
                    token : localStorage.token
                },
            })
            .then(({data})=>{
                console.log(data.status)
                let status = null
                switch(data.status){
                    case "backlog" : 
                        this.deleteTask(data.id)
                        break
                    case "todo" : 
                        console.log('masuk done')
                        data.status = 'backlog'
                        axios({
                            url : 'http://localhost:3000/task/'+data.id,
                            method : 'put',
                            headers : {
                                token : localStorage.token
                            },
                            data
                        })
                        .then(({data})=>{
                            this.getTasks()
                        })
                        .catch(err => {
                            console.log(err)
                        })
                        break
                    case "doing" : 
                        console.log('masuk done')
                        data.status = 'todo'
                        axios({
                            url : 'http://localhost:3000/task/'+data.id,
                            method : 'put',
                            headers : {
                                token : localStorage.token
                            },
                            data
                        })
                        .then(({data})=>{
                            this.getTasks()
                        })
                        .catch(err => {
                            console.log(err)
                        })
                        break
                    case "done" : 
                        console.log('masuk done')
                        data.status = 'doing'
                        axios({
                            url : 'http://localhost:3000/task/'+data.id,
                            method : 'put',
                            headers : {
                                token : localStorage.token
                            },
                            data
                        })
                        .then(({data})=>{
                            this.getTasks()
                        })
                        .catch(err => {
                            console.log(err)
                        })
                        break
                }
            })
        },
        goRight(id){
            axios({
                url : 'http://localhost:3000/task/'+id,
                method : 'get',
                headers : {
                    token : localStorage.token
                },
            })
            .then(({data})=>{
                console.log(data.status)
                let status = null
                switch(data.status){
                    case "backlog" : 
                        data.status = 'todo'
                        axios({
                            url : 'http://localhost:3000/task/'+data.id,
                            method : 'put',
                            headers : {
                                token : localStorage.token
                            },
                            data
                        })
                        .then(({data})=>{
                            this.getTasks()
                        })
                        .catch(err => {
                            console.log(err)
                        })
                        break
                    case "todo" : 
                        console.log('masuk done')
                        data.status = 'doing'
                        axios({
                            url : 'http://localhost:3000/task/'+data.id,
                            method : 'put',
                            headers : {
                                token : localStorage.token
                            },
                            data
                        })
                        .then(({data})=>{
                            this.getTasks()
                        })
                        .catch(err => {
                            console.log(err)
                        })
                        break
                    case "doing" : 
                        console.log('masuk done')
                        data.status = 'done'
                        axios({
                            url : 'http://localhost:3000/task/'+data.id,
                            method : 'put',
                            headers : {
                                token : localStorage.token
                            },
                            data
                        })
                        .then(({data})=>{
                            this.getTasks()
                        })
                        .catch(err => {
                            console.log(err)
                        })
                        break
                    case "done" : 
                        console.log('masuk done')
                        this.deleteTask(data.id)
                        break
                }
            })
        },
    },
    created(){
        this.getTasks()
        if(localStorage.token){
            this.logged = true
        }
    }
})