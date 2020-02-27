<template>
    <div class="card-body card-body-task">
        <div class="d-flex align-items-center justify-content-between">
            <h5 class="card-title text-justify">{{ title }}</h5>
            <img @click="$emit('deletetask', id)" src='../assets/trash.png' class="deleteImage ml-4" alt="Trash">
        </div>
        <p class="text-left task-belong mt-2">Assigned to <span style="color: rgb(243, 126, 31);">{{ name }}</span></p>
    </div>
</template>

<script>
export default {
    props: ['title', 'name', 'id']
}
</script>

<style>

</style>

