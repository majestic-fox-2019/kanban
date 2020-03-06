// function onSignIn(googleUser) {
//     console.log('masuk on sign in')
//     console.log(googleUser)
//     let id_token = googleUser.getAuthResponse().id_token;
//     axios({
//         url : 'https://kanban-jovi.herokuapp.com/user/google',
//         method : 'post',
//         data : {
//             id_token
//         }
//     })
//     .then(({data}) => {
//         localStorage.token = data
//     })
//     .catch(err => {
//         console.log(err.response)
//     })
// }

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
    mounted() {
        gapi.signin2.render('google-signin-btn', { // this is the button "id"
            onsuccess: this.onSignIn // note, no "()" here
        })
    },
    methods : {
        onSignIn (googleUser){
            let id_token = googleUser.getAuthResponse().id_token
            axios({
                url : 'https://kanban-jovi.herokuapp.com/user/google',
                method : 'post',
                data : {
                    id_token
                }
            })
            .then(({data}) => {
                localStorage.token = data
                this.logged = true
                this.getTasks
            })
            .catch(err => {
                console.log(err.response)
            })
        },
        login : function(){
            let body = {
                email : this.email,
                password : this.password
            }
            axios({
                url : 'https://kanban-jovi.herokuapp.com/user/login',
                method : 'post',
                data : body 
            })
            .then(({data})=>{
                console.log(data)
                localStorage.token = data
                this.logged = true
                this.getTasks()
            })
            .catch(({response})=>{
                Swal.fire(response.data.msg)
                console.log(response.data.msg)
            })
        },
        register : function(){
            let body = {
                email : this.email,
                password : this.password
            }
            axios({
                url : 'https://kanban-jovi.herokuapp.com/user/register',
                method : 'post',
                data : body 
            })
            .then(({data})=>{
                console.log(data)
                localStorage.token = data
                this.logged = true
                this.getTasks()
            })
            .catch(({response})=>{
                Swal.fire(response.data.msg)
                console.log(response.data.msg)
            })
        },
        logout : function(){
            localStorage.clear()
            this.logged = false
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
                url : 'https://kanban-jovi.herokuapp.com/task/',
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
                console.log(err.response)
            })
        },
        getTasks : function(){
            axios({
                url : 'https://kanban-jovi.herokuapp.com/task/',
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
                url : 'https://kanban-jovi.herokuapp.com/task/'+id,
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
                console.log(err.response)
            })
        },
        showEditForm(id){
            axios({
                url : 'https://kanban-jovi.herokuapp.com/task/'+id,
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
                console.log(err.response)
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
                url : 'https://kanban-jovi.herokuapp.com/task/'+this.id,
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
                console.log(err.response)
            })
        },
        goLeft(id){
            axios({
                url : 'https://kanban-jovi.herokuapp.com/task/'+id,
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
                            url : 'https://kanban-jovi.herokuapp.com/task/'+data.id,
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
                            console.log(err.response)
                        })
                        break
                    case "doing" : 
                        console.log('masuk done')
                        data.status = 'todo'
                        axios({
                            url : 'https://kanban-jovi.herokuapp.com/task/'+data.id,
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
                            console.log(err.response)
                        })
                        break
                    case "done" : 
                        console.log('masuk done')
                        data.status = 'doing'
                        axios({
                            url : 'https://kanban-jovi.herokuapp.com/task/'+data.id,
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
                            console.log(err.response)
                        })
                        break
                }
            })
        },
        goRight(id){
            axios({
                url : 'https://kanban-jovi.herokuapp.com/task/'+id,
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
                            url : 'https://kanban-jovi.herokuapp.com/task/'+data.id,
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
                            console.log(err.response)
                        })
                        break
                    case "todo" : 
                        console.log('masuk done')
                        data.status = 'doing'
                        axios({
                            url : 'https://kanban-jovi.herokuapp.com/task/'+data.id,
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
                            console.log(err.response)
                        })
                        break
                    case "doing" : 
                        console.log('masuk done')
                        data.status = 'done'
                        axios({
                            url : 'https://kanban-jovi.herokuapp.com/task/'+data.id,
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
                            console.log(err.response)
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
        if(localStorage.token){
            this.logged = true
        }
    }
})