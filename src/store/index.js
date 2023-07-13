import Vue from "vue";
import Vuex from "vuex";
import mAuth from "@/store/modules/mAuth";
import mCourses from "@/store/modules/mCourses";
import mReq from "@/store/modules/mReq";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: { mAuth, mCourses, mReq },
});
