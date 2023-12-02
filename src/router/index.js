import { createRouter, createWebHistory } from "vue-router";
import { layoutMiddleware } from "./middleware";
import { RT_HOME, MT_HOME, RT_LOGIN, MT_LOGIN } from "../constants/routeNames";

import Home from "../pages/Home.vue";
import Login from "../pages/Login.vue";

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: "/",
      name: RT_HOME,
      component: Home,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/login",
      name: RT_LOGIN,
      component: Login,
      meta: {
        layout: "Auth",
        title: MT_LOGIN,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  if (to.name !== "login" && !token) {
    next({ name: "login" });
  } else {
    next();
  }
});

router.beforeResolve(async (to, from) => {
  await layoutMiddleware(to);
  document.title = to.meta.title;

  console.log();
});

export default router;
