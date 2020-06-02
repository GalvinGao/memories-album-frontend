<template>
  <span>
    {{ name }}
  </span>
</template>

<script>
  export default {
    name: "NameInline",
    props: {
      person: {
        type: Object,
        required: true
      }
    },
    computed: {
      name() {
        if (this.person["chineseName"]) {
          return this.person["chineseName"].replace(/\|/g, "")
        } else {
          return this.person["englishName"].replace(/\|/g, " ")
        }
      }
    },
  }
</script>

<style scoped>

</style>