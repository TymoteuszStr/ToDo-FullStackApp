import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Auth from "../views/Auth.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Auth",
    component: Auth,
  },
  {
    path: "/home",
    name: "Home",
    component: () =>
      import(/* webpackChunkName: "Home" */ "../views/Home.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
