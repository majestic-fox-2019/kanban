<template>
              <main >
                <div class="kanban" v-for="category in categories" v-bind:key="category.id">
                    <div class="category">{{category.name}}</div>
                    <div class="item">
                        <div class="title" v-for="task in category.Tasks" v-bind:key="task.id">
                            <div>
                                <div class="title-button">
                                     <i class="material-icons" @click.prevent="update(task)" v-bind:key="task.id">edit</i>
                                     <i class="material-icons" @click.prevent="alertDisplay(task)">delete</i>
                                </div>
                                <p>{{task.title}}</p>
                            </div>
                        </div>
                    </div>
                    <AddTask v-bind:task="task" v-bind:CategoryId="category.id"></AddTask>
                </div>
            </main>
</template>

<script>
import AddTask from './AddTask'
import axios from 'axios'

export default {
    name: 'Categories',
    components : {AddTask}
}
</script>

<style>

</style>