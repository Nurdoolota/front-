import Vue from "vue";
import Vuex from "vuex";
import mAuth from "@/store/modules/mAuth";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { mAuth },
});
