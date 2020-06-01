<template>
  <div>
    <v-img
      :aspect-ratio="3224/2448"
      :src="require('@/assets/background.jpg')"
      style="height: 60vh; margin-top: -12px"
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
          勤礼外语中学
        </h6>
        <h2 class="headline">
          2020 届毕业生
        </h2>
        <h2 class="headline">
          纪念相册
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