import AuthorizePage from "@/views/AuthorizePage.vue";
import RegistrationPage from "@/views/RegistrationPage.vue";

const routes = [
  {
    path: "/registration",
    name: "registration",
    component: RegistrationPage,
    meta: { guest: true },
  },
  {
    path: "/authorization",
    name: "authorization",
    component: AuthorizePage,
    meta: { guest: true },
  },
];

export default routes;
