<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      app
      class="fill-height d-flex flex-column"
    >
      <v-list-item class="pa-0">
        <v-list-item-content class="pa-0">
          <v-list-item-title class="d-flex flex-column title indigo darken-3 py-6 align-center justify-center">
            <v-img
              :src="require('@/assets/logo.png')"
              aspect-ratio="1"
              height="64px"
              width="64px"
              contain
            />
            <span
              class="white--text serif font-weight-regular text-center mt-2"
              style="font-size: 1rem; line-height: 1.8rem;"
            >
              勤礼外语中学<br>2020 届毕业生纪念相册
            </span>
          </v-list-item-title>
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

      <v-btn
        class="mx-2"
        color="secondary"
        @click="$store.dispatch('data/fetch', true)"
      >
        <v-icon left>
          mdi-database-refresh
        </v-icon>
        重载数据
      </v-btn>

      <v-footer
        fixed
        class="transparent mb-4 d-flex flex-column"
      >
        <v-img
          :src="require('@/assets/kinglee-logo.png')"
          height="64px"
          contain
          class="mx-auto logo-background justify-center align-center"
          style="opacity: 0.8"
        />
        <h6 class="overline mt-2">
          Kinglee High School
        </h6>
        <h5 class="subtitle-2">
          开发者：Galvin Gao
        </h5>
      </v-footer>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title class="d-flex align-center">
        <v-img
          :src="require('@/assets/logo.png')"
          aspect-ratio="1"
          height="32px"
          width="32px"
        />
        <span class="ml-1 serif">
          · 纪念相册
        </span>
      </v-toolbar-title>
    </v-app-bar>

    <v-content>
      <transition
        name="slide-fade"
        mode="out-in"
      >
        <router-view />
      </transition>
    </v-content>

    <v-footer
      padless
      inset
      color="indigo"
      class="white--text"
    >
      <!--      <v-card-->
      <!--        flat-->
      <!--        tile-->
      <!--        width="100%"-->
      <!--        color="indigo"-->
      <!--        class="text-center py-3"-->
      <!--      >-->
      <!--        <v-card-text class="white&#45;&#45;text d-inline">-->
      <!--          <span>Memories Album</span>-->
      <!--          —-->
      <!--          <strong>Galvin Gao</strong>-->
      <!--          <span class="overline monospace condensed ml-1">2020</span>-->
      <!--        </v-card-text>-->
      <!--      </v-card>-->
      <Footer />
    </v-footer> 
  </v-app>
</template>

<script>
import Footer from "@/components/Footer";
export default {
  name: 'App',
  components: {Footer},
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
