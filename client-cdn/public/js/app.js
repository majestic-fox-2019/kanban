const baseURL = "http://localhost:3000";
const vue = new Vue({
    el: "#app",
    data: {
        tab: "login",

        nameRegister: null,
        emailRegister: null,
        passwordRegister: null,

        emailLogin: null,
        passwordLogin: null,

        categories: null,
        titleCategory: null,
        titleCategories: {},
        SelectedCategory: null
    },
    methods: {
        checkToken() {
            if (!localStorage.getItem("token")) {
                this.tab = "login";
            } else {
                this.getCategories();
                this.tab = "main";
            }
        },
        login() {
            const obj = {
                email: this.emailLogin,
                password: this.passwordLogin
            }
            axios.post(`${baseURL}/login`, obj)
                .then(data => {
                    this.emailLogin = null;
                    this.passwordLogin = null;
                    this.tab = "main";
                    localStorage.setItem("token", data.data.token);
                });
        },
        register() {
            const obj = {
                name: this.nameRegister,
                email: this.emailRegister,
                password: this.passwordRegister
            }
            axios.post(`${baseURL}/register`, obj)
                .then(data => {
                    this.nameRegister = null;
                    this.emailRegister = null;
                    this.passwordRegister = null;
                    this.tab = "login";
                });
        },
        getCategories() {
            axios.get(`${baseURL}/categories`, { headers: { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Im5hbmRhIiwiaWF0IjoxNTgxNTA4NTkyfQ.hFqmdMlKULzM6SE0g1gdrq0XhHMt29LVw1fr_RTv4SQ" } })
                .then(data => {
                    let obj = {}
                    data.data.forEach(el => {
                        obj[el.title] = null;
                    });
                    this.titleCategories = { ...obj };
                    this.categories = data.data;
                })
        },
        createCategory() {
            const obj = { title: this.titleCategory };
            const headers = { headers: { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Im5hbmRhIiwiaWF0IjoxNTgxNTA4NTkyfQ.hFqmdMlKULzM6SE0g1gdrq0XhHMt29LVw1fr_RTv4SQ" } }
            axios.post(`${baseURL}/categories`, obj, headers)
                .then(data => {
                    let obj = { ...this.titleCategories };
                    obj[data.data.title] = null;
                    this.titleCategories = { ...obj };
                    const obj2 = data.data;
                    obj2.Tasks = [];
                    this.categories.push(obj2);
                    this.titleCategory = null;
                })
        },
        createTask(title, id, i) {
            const obj = { title: this.titleCategories[title], CategoryId: id };
            const headers = { headers: { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Im5hbmRhIiwiaWF0IjoxNTgxNTA4NTkyfQ.hFqmdMlKULzM6SE0g1gdrq0XhHMt29LVw1fr_RTv4SQ" } };
            axios.post(`${baseURL}/tasks`, obj, headers)
                .then(data => {
                    this.categories[i].Tasks.push(data.data);
                    this.titleCategories[title] = null;
                });
        },
        deleteTask(id, i, j) {
            const headers = { headers: { token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibmFtZSI6Im5hbmRhIiwiaWF0IjoxNTgxNTA4NTkyfQ.hFqmdMlKULzM6SE0g1gdrq0XhHMt29LVw1fr_RTv4SQ" } };
            axios.delete(`${baseURL}/tasks/${id}`, headers)
                .then(data => {
                    this.categories[i].Tasks.splice(j, 1);
                });
        }
    },
    created() {
        this.checkToken();
    }
});