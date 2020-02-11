let backlog = new Vue({
    el: "#backlog",
    data: {
        tasks: [
            {
                title: "Memberi makan kucing",
                description: "Memberi makan kucing hacktiv yang suka nyebar virus corona",
                category: "backlog"
            }
        ]
    },
    methods: {
        addCard: function(event) {
            this.tasks.push({
                title: 'Default Title',
                description: `Default Description 
                <br><br>
                *<small>click to update data</small>*`,
                category: "backlog"
            });
        }
    }
});

let product = new Vue({
    el: "#product",
    data: {
        tasks: [
            {
                title: "Memberi makan buaya",
                description: "Memberi makan pake ayam kfc",
                category: "product"
            }
        ]
    },
    methods: {
        addCard: function(event) {
            this.tasks.push({
                title: 'Default Title',
                description: `Default Description 
                <br><br>
                *<small>click to update data</small>*`,
                category: "backlog"
            });
        }
    }
})

let development = new Vue({
    el: "#development",
    data: {
        tasks: [
            {
                title: "Coding kanban dan Todo List",
                description: "Lorem ipsum dolor sit amet jokoy donoloyo",
                category: "development"
            }
        ]
    },
    methods: {
        addCard: function(event) {
            this.tasks.push({
                title: 'Default Title',
                description: `Default Description 
                <br><br>
                *<small>click to update data</small>*`,
                category: "backlog"
            });
        }
    }
})

let done = new Vue({
    el: "#done",
    data: {
        tasks: [
            {
                title: "Coding kanban dan Todo List",
                description: "Lorem ipsum dolor sit amet jokoy donoloyo",
                category: "done"
            }
        ]
    },
    methods: {
        addCard: function(event) {
            this.tasks.push({
                title: 'Default Title',
                description: `Default Description 
                <br><br>
                *<small>click to update data</small>*`,
                category: "backlog"
            });
        }
    }    
})
