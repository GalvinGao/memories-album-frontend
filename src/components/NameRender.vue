<template>
  <span>
    {{ person.name }}
  </span>
</template>

<script>
  export default {
    name: "NameRender",

    props: {
      person: {
        type: Object,
        required: true
      },
    },
  }
</script>

<style scoped>

</style>