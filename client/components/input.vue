<template>
    <form action="" @submit.prevent="$emit('addtocategory', {inputForm, category})">
        <input class="input-task form-control rounded-0" type="text" placeholder="New task..." style="border: 0.5px solid grey" v-model="inputForm">
    </form>
</template>

<script>
export default {
    props: ['category'],
    data: function(){
        return {
            inputForm: ""
        }
    }
}
</script>

<style>

</style>