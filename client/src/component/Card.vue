<template>
    <div id="card">
        <h1>{{title}}</h1>
    </div>
</template>

<script>
export default {
    props:["title"]
}
</script>

<style lang="scss">
@import "../../style/_variables.scss"; 
#card {
    width: 100%;
    border: 1px solid $white-color;
}

</style>