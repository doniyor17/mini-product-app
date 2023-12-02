import { createRouter, createWebHistory } from "vue-router";
import { layoutMiddleware } from "./middleware";

import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
    },
    {
      path: "/login",
      name: "login",
      component: Login,
      meta: {
        layout: "Auth",
      },
    },
  ],
});

router.beforeResolve(async (to, from) => {
  await layoutMiddleware(to);
});

export default router;
