<template>
                <div class="kanban" >
                    <div class="category"></div>
                    <div class="item">
                        <div class="title" >
                            <div>
                                <div class="title-button">
                                     <i class="material-icons" >edit</i>
                                     <i class="material-icons">delete</i>
                                </div>
                                <p></p>
                            </div>
                        </div>
                    </div>
                    <AddTask ></AddTask>
                </div>
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