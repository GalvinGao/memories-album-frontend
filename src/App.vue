<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            <span class="monospace">
              memories album
            </span>
          </v-list-item-title>
          <v-list-item-subtitle>
            2020 届毕业生纪念相册
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider />

      <v-list
        dense
        nav
      >
        <v-list-item
          v-for="(route, i) in routes"

          :key="i"
          link
          :to="{ path: route.path }"
        >
          <v-list-item-icon>
            <v-icon>{{ route.meta.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ route.meta.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        <span class="monospace">
          memories
        </span>
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container fluid>
        <transition
          name="slide-fade"
          mode="out-in"
        >
          <router-view />
        </transition>
      </v-container>
    </v-content>

    <v-footer
      padless
      color="indigo"
      class="white--text"
    >
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
    </v-footer> 
  </v-app>
</template>

<script>
export default {
  name: 'App',

  data() {
    return {
      drawer: null
    }
  },

  computed: {
    routes () {
      return this.$router.options.routes.filter(el => !el.meta.hide)
    }
  },

  created () {
    this.$store.dispatch("data/fetch")
  },
};
</script>

<style lang="sass">
  @import 'styles/global'
</style>
