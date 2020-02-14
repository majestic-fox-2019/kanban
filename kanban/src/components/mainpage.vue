<template> 
    <div class="row">
        <AddTask></AddTask>
        <div id="kanbancontent" class="col-9">
            <div class="row">
                <div class="col-3">
                    <div class="card border-black">
                        <div class="card-body">
                        <h4 class="card-title">Backlog</h4>
                            <div v-for="task in backlog" :key="task" class="mb-2">
                                <TaskCard 
                                :task="task">
                                </TaskCard>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="card border-black">
                        <div class="card-body">
                        <h4 class="card-title">Todo</h4>
                            <div v-for="task in todo" :key="task" class="mb-2">
                                <TaskCard
                                :task="task">
                                </TaskCard>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="card border-black">
                        <div class="card-body">
                        <h4 class="card-title">Doing</h4>
                            <div v-for="task in doing" :key="task" class="mb-2">
                                <TaskCard 
                                :task="task">
                                </TaskCard>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-3">
                    <div class="card border-black">
                        <div class="card-body">
                        <h4 class="card-title">Done</h4>
                            <div v-for="task in done" :key="task">
                                <TaskCard 
                                :task="task">
                                </TaskCard>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AddTask from '../views/AddTask'
import TaskCard from '../views/TaskCard'
import db from '../../config/firebase'

export default {
    data(){
        return{
            backlog : [],
            todo : [],
            doing : [],
            done : []
        }
    },
    components: {
        AddTask,
        TaskCard
    },
    created(){
        console.log("tembak ke firebase..")
        db.collection("kanban").onSnapshot( docSnapshot => {
            console.log("data nya ini : ")
            this.backlog = []
            this.todo = []
            this.doing = []
            this.done = []
            docSnapshot.forEach(doc => {
            console.log(doc.data())
                let status = doc.data().status
                let data = doc.data()
                data.id = doc.id
                switch(status){
                    case "backlog" : 
                        this.backlog.push(data)
                        break
                    case "todo" : 
                        this.todo.push(data)
                        break
                    case "doing" : 
                        this.doing.push(data)
                        break
                    case "done" : 
                        this.done.push(data)
                        break
                }
            });
        })
    }
}
</script>

<style>
#backlog{
    height : 100%;
    border-color: black;
    border-radius: .7rem;

}
</style>