import Vue from 'vue';
import mergedManager from '@/models/merged'

export default {
  namespaced: true,
  state: {
    data: {}
  },
  mutations: {
    storeData: (state, {name, value,}) => {
      Vue.set(state.data, name, {
        /** The data object last updated at time */
        upd: Date.now(),
        /** The content of the data object */
        c: value
      })
    },
    clearData: (state) => {
      Vue.set(state, "data", {})
    }
  },
  actions: {
    // eslint-disable-next-line
    async fetch({commit}, refresh = false) {
      if (refresh) commit("clearData")
      mergedManager.refresh(refresh);
    },
  },
  getters: {
    content: (state) => (id) => {
      return id in state.data && state.data[id]["c"]
    },
    updated: (state) => (id) => {
      return id in state.data && state.data[id]["upd"]
    }
  }
};