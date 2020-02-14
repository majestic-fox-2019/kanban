<template>
  <button :buttonname="buttonname" @click="$emit('click')">{{buttonname}}</button>
</template>

<script>
export default {
  props: ['buttonname']
};
</script>

<style>

</style>
