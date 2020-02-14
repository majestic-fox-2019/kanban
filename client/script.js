const localhost = `http://localhost:3000`;
var app = new Vue({
    el: "#app",
    data: {
        loginpage: false,
        displaypage: true,
        cardsContainer: null,
        addModalShow: false,
        addForm: {
            title: null,
            status: null
        },
        addCategory: null,
        loginForm: {
            email: null,
            password: null
        }
    },
    methods: {
        login() {
            axios({
                method: "POST",
                url: `${localhost}/user/login`,
                data: {
                    email: this.loginForm.email,
                    password: this.loginForm.password
                }
            })
                .then(res => {
                    this.loginpage = false;
                    this.showTask();
                    this.displaypage = true;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        showTask() {
            axios({
                method: "GET",
                url: `${localhost}/task`
            })
                .then(res => {
                    console.log(res.data);
                    this.cardsContainer = res.data.result;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        deleteOne(id) {
            axios({
                method: "DELETE",
                url: `${localhost}/task/${id}`
            })
                .then(res => {
                    this.showTask();
                })
                .catch(err => {
                    console.log(err);
                });
        },
        getStatus(status) {
            console.log(status);
            this.addForm.status = status;
        },
        addOne() {
            axios({
                method: "POST",
                url: `${localhost}/task`,
                data: {
                    title: this.addForm.title,
                    status: this.addForm.status,
                    UserId: 0
                }
            })
                .then(res => {
                    this.showTask();
                })
                .catch(err => {
                    console.log(err);
                });
        }
    },
    created: function() {
        this.showTask();
    }
});
