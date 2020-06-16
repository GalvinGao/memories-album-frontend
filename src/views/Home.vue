<template>
  <div>
    <v-img
      :aspect-ratio="1944/1296"
      :src="require('@/assets/background.jpg')"
      style="height: 60vh; margin-top: -12px"
      gradient="to top right, rgba(100,115,201,.1), rgba(25,32,72,.7)"
    >
      <v-col
        cols="12"
        class="d-flex flex-column justify-center text-center fill-height"
        style="background: rgba(0, 0, 0, .5)"
      >
        <div class="d-flex flex-row align-center justify-center">
          <v-img
            :src="require('@/assets/kinglee-logo.png')"
            aspect-ratio="1"
            height="64px"
            width="64px"
            contain
            class="flex-grow-0 mb-2"
          />
          <v-img
            :src="require('@/assets/logo.png')"
            aspect-ratio="1"
            height="96px"
            width="96px"
            contain
            class="flex-grow-0 mb-2"
          />
        </div>
        <h6 class="overline">
          {{ $t('app.school') }}
        </h6>
        <h2 class="headline">
          {{ $t('home.subtitle') }}
        </h2>
        <h2 class="headline">
          {{ $t('home.title') }}
        </h2>
      </v-col>
    </v-img>
    <v-container fluid>
      <PeopleList />
    </v-container>
  </div>
</template>

<script>
  import PeopleList from "@/components/PeopleList";
  export default {
    name: 'Home',
    components: {PeopleList},
    data: () => ({

    }),
    computed: {
      routes () {
        return this.$router.options.routes.filter(el => el.path !== '/' && !el.meta.hide)
      }
    }
  }
</script>