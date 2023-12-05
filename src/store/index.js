import { createStore } from "vuex";
import axios from "axios";
import router from "../router";
import { RT_HOME, RT_LOGIN } from "../constants/routeNames";
import { errorToast } from "../utils/toast";

const url = import.meta.env.VITE_BASE_URL;

const store = createStore({
  state: {
    user: {},
    products: [],
    loading: false,
  },

  getters: {
    products: (state) => state.products,
  },

  actions: {
    async login({ commit }, payload) {
      try {
        const res = await axios.post(url + "auth/login", payload);
        if (!res.data?.token && res.status !== 200) {
          return;
        }
        commit("SET_TOKEN", res.data.token);
        commit("SET_USER", res.data);
      } catch (err) {
        errorToast("Something went wrong!");
      }
    },

    async fetchProducts({ commit }) {
      commit("SET_LOADING", true);
      try {
        const res = await axios.get(url + "products");
        if (!res.data?.products && res.status !== 200) {
          return;
        }
        commit("SET_LOADING", false);
        commit("SET_PRODUTS", res.data.products);
      } catch (err) {
        errorToast("Cannot fetch products");
      }
    },

    async searchProducts({ commit }, title) {
      try {
        const res = await axios.get(url + `products/search?q=${title}`);
        if (!res.data?.products && res.status !== 200) {
          return;
        }
        commit("SET_PRODUTS", res.data.products);
      } catch (err) {
        errorToast("Cannot fetch products");
      }
    },
  },

  mutations: {
    SET_LOADING: (state, payload) => (state.loading = payload),

    SET_TOKEN: (_, payload) => {
      localStorage.setItem("token", payload);
    },

    SET_USER: (state, payload) => {
      state.user = payload;
      router.push({ name: RT_HOME });
    },

    SET_PRODUTS: (state, payload) => (state.products = payload),

    LOGOUT: (state) => {
      state.user = {};
      localStorage.removeItem("token");
      router.push({ name: RT_LOGIN });
    },
  },
});

export default store;
