<template>
  <v-dialog
    v-model="pending"
    persistent
    width="300"
    overlay-opacity="0.95"
    overlay-color="#121212"
  >
    <v-card
      color="secondary"
    >
      <v-card-title class="mb-0 body-1">
        {{ $t('loading') }}
      </v-card-title>
      
      <v-card-text>
        <v-progress-linear
          indeterminate
          color="white"
          class="mb-0"
        />
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapGetters } from "vuex";

  export default {
    name: "NetworkBusyIndicator",
    computed: {
      ...mapGetters("ajax", ["pending"])
    }
  }
</script>

<style scoped>

</style>