<template>
  <v-card
    flat
    tile
    width="100%"
    color="indigo"
    class="text-center py-3"
  >
    <v-card-text class="white--text d-inline">
      <span>Memories Album</span>
      —
      <strong>Galvin Gao</strong>
      <span class="overline monospace condensed ml-1">2020</span>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: "Footer",
    data() {
      return {
        icons: [
          'mdi-facebook',
          'mdi-twitter',
          'mdi-linkedin',
          'mdi-instagram',
        ],
      }
    },
  }
</script>

<style scoped>

</style>