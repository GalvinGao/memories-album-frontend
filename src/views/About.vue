<template>
  <v-container class="about">
    <h1>This is an about page</h1>
  </v-container>
</template>

<script>
  import get from "@/utils/get";

  export default {
    name: 'About',

    computed: {
      faces () {
        return get.image.all()
      }
    }
  }
</script>