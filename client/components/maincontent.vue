<template>
<div>
    <div class="container" id="categories">
    <button type="button" class="btn btn-info mt-2 ml-2" @click.prevent="$emit('showmodal')">Add Detailed Task</button>
    <!-- CONTAINER -->
        <!-- CATEGORY -->
        <div class="d-flex justify-content-start">
            <div class="card card-category align-self-start" v-for='(category, i) in categorydata' :key="i">
                <div class="card-header py-1" id="category-title">
                    <div class="card-title task-category">{{ category.text }}</div>
                </div>
                <div class="card-container">
                    <div class="scroll">
                        <draggable :list="category.tasks" :options="{group: { name:'categoryData' }}" @end="$emit('onend', $event)">
                            <transition-group tag="div" class="" :id="category.text">
                                <div class="card" v-for='task in category.tasks' :key="task.id" :id="task.id">
                                    <cardTask
                                        :title="task.title"
                                        :name="task.name"
                                        :id="task.id"
                                        @deletetask="$emit('deletetask', $event)"
                                    ></cardTask>
                                </div>
                            </transition-group>
                        </draggable>
                    </div>
                </div>
                <inputForm :category="category.text" @addtocategory="$emit('addtocategory', $event)">
                </inputForm>
            </div>
        </div>
        <!-- END CATEGORY-->
    </div>
</div>
</template>

<script>
import draggable from 'vuedraggable'
import inputForm from './input'
import cardTask from './card'

export default {
    props: ['categorydata'],
    components: {
        draggable,
        inputForm,
        cardTask
    }
}
</script>

<style>

</style>