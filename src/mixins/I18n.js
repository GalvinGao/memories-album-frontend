import dayjs from "dayjs";
import {mapGetters} from "vuex";

export default {
  methods: {
    changeLocale(localeId, save) {
      dayjs.locale(localeId);
      if (save) this.$store.commit("settings/changeLocale", localeId)
      this.$i18n.locale = localeId;
      this.$vuetify.lang.current = localeId;
      document.title = `${this.$t('app.name')}`;
      document.documentElement.lang = localeId;
    }
  },
  computed: {
    ...mapGetters('settings', ['language']),
    languageFont () {
      return `lang-${this.$i18n.locale}`
    },
  },
}