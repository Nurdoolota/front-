import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import CoursesPage from "@/views/CoursesPage.vue";
import ErrorPage from "@/views/ErrorPage.vue";
import rAuth from "./rAuth";
import PersonalPage from "@/views/PersonalPage";
import AdminPage from "@/views/AdminPage.vue";
import mixAuth from "@/mixins/mixAuth";

Vue.use(VueRouter);

const routes = [
  ...rAuth,
  {
    path: "/",
    name: "courses",
    component: CoursesPage,
    meta: { requiresAuth: true },
  },
  {
    path: "*",
    name: "error",
    component: ErrorPage,
  },
  {
    path: "/personal",
    name: "personal",
    component: PersonalPage,
    meta: { requiresAuth: true },
  },
  {
    path: "/admin",
    name: "admin",
    component: AdminPage,
    meta: { requiresAuth: true, isAdmin: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

console.log(process.env.BASE_URL);

router.beforeEach(async (to, from, next) => {
  const response = await mixAuth.methods.aurhorize();
  console.log(response);

  if (response.ok) {
    store.commit("mAuth/changeAuth", true);
    store.commit("mAuth/setUser", await response.json());
  } else store.commit("mAuth/changeAuth", false);

  if (to.meta.requiresAuth)
    if (store.getters["mAuth/getAuth"]) next();
    else next({ name: "authorization" });
  else if (to.meta.guest)
    if (!store.getters["mAuth/getAuth"]) next();
    else next(from);
  if (to.meta.isAdmin)
    if (store.getters["mAuth/getRole"] === "ADMIN") next();
    else next(from);
  else next();
});

export default router;
