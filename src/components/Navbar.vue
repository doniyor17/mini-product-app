<template>
  <nav
    class="bg-secondary py-3 flex justify-between items-center text-white px-3"
  >
    <a href="#"> Logo </a>
    <div class="w-[25%] flex justify-between items-center">
      <router-link
        class="link"
        to="/"
        >Home</router-link
      >
      <router-link
        class="link"
        to="/about"
        >About</router-link
      >
      <router-link
        class="link"
        to="/cart"
        >Cart</router-link
      >
      <Button
        class="btn-warning"
        @click="logout"
      >
        Logout
      </Button>
    </div>
  </nav>
</template>

<script setup>
import Button from "./base/base-button.vue";
import { useStore } from "vuex";

const store = useStore();

function logout() {
  store.commit("LOGOUT");
}
</script>

<style scoped>
.link {
  border-bottom: 2px transparent solid;
  padding-bottom: 5px;
  transition: all 0.4s;
}
.router-link-exact-active {
  border-bottom: 2px #444 solid;
  color: #444;
}
</style>
