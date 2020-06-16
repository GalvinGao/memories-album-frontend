import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import data from "./modules/data"
import ajax from "./modules/ajax"
import settings from "./modules/settings"

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      key: "memories-album-store",
      paths: [
        "data",
        "settings"
      ],
    })
  ],
  modules: {
    data,
    ajax,
    settings
  }
});