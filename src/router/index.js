import { createRouter, createWebHistory } from "vue-router";
import { layoutMiddleware } from "./middleware";

import store from "../store";

import {
  RT_HOME,
  MT_HOME,
  RT_LOGIN,
  MT_LOGIN,
  RT_ABOUT,
  MT_ABOUT,
  RT_CART,
  MT_CART,
  RT_404,
  MT_404,
} from "../constants/routeNames";

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
        title: MT_HOME,
      },
    },
    {
      path: "/about",
      name: RT_ABOUT,
      component: () => import("../pages/About.vue"),
      meta: {
        requiresAuth: true,
        title: MT_ABOUT,
      },
    },
    {
      path: "/cart",
      name: RT_CART,
      component: () => import("../pages/Cart.vue"),
      meta: {
        requiresAuth: true,
        title: MT_CART,
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
    {
      path: "/:pathmatch(.*)*",
      name: RT_404,
      component: () => import("../pages/404.vue"),
      meta: {
        title: MT_404,
        layout: "NotFound",
      },
    },
  ],
});

function decodeJwt(token) {
  if (token) {
    const base64Payload = token.split(".")[1];
    const payloadBuffer = window.atob(base64Payload);
    return JSON.parse(payloadBuffer.toString());
  } else {
    return { exp: 0 };
  }
}

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");

  const parsedToken = decodeJwt(token);
  const isTokenExpired = parsedToken.exp < Date.now() / 1000;
  // true => logout

  if (to.name !== RT_LOGIN && isTokenExpired) {
    store.commit("LOGOUT");
  } else if (!isTokenExpired && to.name === RT_LOGIN) {
    next({ name: from.name });
  } else {
    next();
  }
});

router.beforeResolve(async (to, from) => {
  await layoutMiddleware(to);
  document.title = to.meta.title;
});

export default router;
