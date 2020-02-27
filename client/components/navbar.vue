<template>
<div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand">Kanban</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbar-content">
            <ul class="navbar-nav mr-auto">
            </ul>
            <h6 class="mr-4">Welcome, {{ username }}</h6>
            <button class="btn btn-outline-info my-2 my-sm-0" @click.prevent="$emit('logout')">Logout</button>
        </div>
    </nav>
</div>
</template>

<script>
export default {
    props: ['username']
}
</script>

<style>

</style>