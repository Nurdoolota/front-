import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store";
import CoursesPage from "@/views/CoursesPage.vue";
import CoursePage from "@/views/CoursePage.vue";
import ErrorPage from "@/views/ErrorPage.vue";
import rAuth from "./rAuth";
import PersonalPage from "@/views/PersonalPage";
import AdminPage from "@/views/AdminPage.vue";

Vue.use(VueRouter);

const routes = [
  ...rAuth,
  {
    path: "/",
    redirect: "/courses",
  },
  {
    path: "/courses",
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
  {
    path: "/courses/:id",
    name: "course",
    component: CoursePage,
    props: true,
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

console.log(process.env.BASE_URL);

router.beforeEach(async (to, from, next) => {
  const response = await store.dispatch("mAuth/authorize");
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
