var app = new Vue({
    el: '#app',
    data: {
        base_url: 'http://localhost:3000',
        endpoint_category: '/category',
        endpoint_task: '/task',
        isLoggedIn: true,
        categories: null,
        taskId: null,
        selectedCategory: null,
        showButtonConfirmEdit: null,
        newTask: ''

    },
    methods: {
        typing: function (catSeq, taskSeq) {
            let value = this.categories[catSeq].Tasks[taskSeq].name
            let catId = this.categories[catSeq].id
            let taskId = this.categories[catSeq].Tasks[taskSeq].id
            const updatedValue = {
                value,
                catId,
                taskId
            }
            console.log({ updatedValue })
        },
        addTask: function (categoryId) {
            this.selectedCategory = categoryId
        },
        postTask: function (categoryId) {
            const data = {
                task: this.newTask,
                categoryId
            }
            this.request({ method: 'post', endpoint: this.endpoint_task, data })
                .then(res => {
                    Swal.close()
                    this.notification({ msg: 'Succesfully added task', icon: 'success' })
                    console.log(res.data)
                })
                .catch(err => {
                    Swal.close()
                    console.log(err)
                })
        },
        cancel: function () {
            this.selectedCategory = null
        },

        getCategory: function () {
            this.loading()
            this.request({ method: 'get', endpoint: this.endpoint_category })
                .then(res => {
                    Swal.close()
                    this.categories = res.data
                }).catch(err => {
                    Swal.close()
                    this.notification({ msg: err.message, icon: 'error' })
                        .then(res => {
                            console.log(res)
                            this.getCategory()
                        })
                    // console.log(err)
                })
        },
        postCategory: function (data) {
            this.request({ method: 'post', data, endpoint: this.endpoint_category })
                .then(res => {
                    Swal.close()
                    this.notification({ msg: 'Succesfully added task', icon: 'success' })
                    console.log(res.data)
                })
                .catch(err => {
                    Swal.close()
                    console.log(err)
                })
        },
        putCategory: function (data) {
            this.request({ method: 'put', data, id, endpoint: this.endpoint_category })
                .then(res => {
                    console.log(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        deleteCategory: function (id) {
            this.request({ method: 'post', data, id, endpoint: this.endpoint_category })
                .then(res => {
                    console.log(res.data)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        request: function (params) {
            Swal.showLoading()
            const { method, data, id, endpoint } = params
            const url = this.base_url + endpoint
            if (id) {
                url = `${url}/id`
            }
            return axios({
                method: method,
                url: url,
                data: data
            })
        },
        editTask: function (id) {
            this.taskId = id
            if (!this.showButtonConfirmEdit) {
                this.showButtonConfirmEdit = id
            } else {
                this.showButtonConfirmEdit = null
                this.taskId = null
            }
        },
        updateTask: function (param) {
            this.showButtonConfirmEdit = null
            this.taskId = null
        },
        loading: function () {
            return Swal.fire({
                title: 'Loading...',
                timerProgressBar: true,
            })
        },
        notification: function ({ msg, icon }) {
            return Swal.fire({
                text: msg,
                icon: icon
            })
        }
    },

    // lifecycle
    beforeCreate: function () {

    },
    created: function () {

    },
    beforeMount: function () { },
    mounted: function () {
        this.getCategory()
    },
    beforeUpdate: function () { },
    updated: function () { },
    beforeDestroy: function () { },
    destroyed: function () { },
    computed: {},
    watch: {
        categories: function () {
            console.log('Category watch called')
        }
    },

})