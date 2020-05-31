<template>
  <v-container>
    <h1 class="display-2 pa-3">
      欢迎
    </h1>
    <PeopleList />
  </v-container>
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