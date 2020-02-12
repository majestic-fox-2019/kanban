let kanban = new Vue({
    el: ".kanban",
    data: {
        "taskCategory": null
    },
    methods: {
        addCard: function(idxCategory) {
            this.taskCategory[idxCategory-1].tasks.push({
                title: 'Default Title',
                description: `Default Description 
                <br><br>
                *<small>click to update data</small>*`,
                category: "backlog"
            });
        }
    },
    beforeMount() {
        fetch('http://localhost:3000/taskCategory')
            .then(res => {
                return res.json();  
            })
            .then(data => {
                this.taskCategory = data
            })
            .catch(err => console.log(err));
    }
});
