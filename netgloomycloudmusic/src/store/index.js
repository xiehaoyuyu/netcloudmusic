import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    searchData: [],
    albumArea: "ZH",
  },
  mutations: {
    getSearchSong(state, arr) {
      state.searchData = arr;
    },
    getAlbum(state, area) {
      state.albumArea = area;
    },
  },
});

export default store;
