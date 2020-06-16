<template>
  <v-app>
    <NetworkBusyIndicator />
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
              {{ $t('app.title.0') }}<br>{{ $t('app.title.1') }}
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
            <v-list-item-title>{{ $t(`menu.${route.meta.title}`) }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-divider class="mt-2 mb-4" />
        <v-row
          justify="space-around"
        >
          <v-btn
            class="mx-2"
            outlined
            small
            @click="$store.dispatch('data/fetch', true)"
          >
            <v-icon
              left
              small
            >
              mdi-database-refresh
            </v-icon>
            {{ $t('menu.reload') }}
          </v-btn>
        </v-row>
      </v-list>

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
          {{ $t('footer.credits') }}
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
          {{ $t('app.bar') }}
        </span>
      </v-toolbar-title>
      <v-spacer />
      <LocaleSwitcher />
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
import LocaleSwitcher from "@/components/LocaleSwitcher";
import strings from "@/utils/strings";
import I18n from "@/mixins/I18n";
import NetworkBusyIndicator from "@/components/NetworkBusyIndicator";
export default {
  name: 'App',
  components: {NetworkBusyIndicator, LocaleSwitcher, Footer},
  mixins: [I18n],
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

    if (this.language) {
      this.changeLocale(this.language, false)
    } else {
      const language = strings.getFirstBrowserLanguage();
      console.info("i18n", "detected language", language);
      if (language) {
        // because this is a detection result, thus we are not storing it,
        // unless the user manually set one.
        this.changeLocale(language, false)
      }
    }
  },
};
</script>

<style lang="sass">
  @import 'styles/global'
</style>
