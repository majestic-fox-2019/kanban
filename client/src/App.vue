<template>
  <div class="tes">
      <home />
  </div>

</template>

<script>
import Home from "./HomePage"

export default {
    data(){
        return {
            arr: 5
        }
    },
    components: {
        Home
    }
}
</script>

<style lang="scss">
@import "../style/_variables.scss";
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
 
html {
    font-size: 62.5%;
}
.tes {

    font-family: $font-stack;
    height: 100vh;
    background-image: linear-gradient(to right bottom, #55efc4, $second-blend-color, $primary-blend-color);
    background-size: cover;
    background-position: top; 
}

ul {
    margin: 0;
    padding: 0;
    list-style-type: none;
}

a {
    text-decoration: none;
}


</style>