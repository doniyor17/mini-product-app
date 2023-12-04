<template>
  <Navbar />
  <div>
    <slot />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useStore } from "vuex";
import Navbar from "../Navbar.vue";

const store = useStore();

onMounted(async () => {
  await store.dispatch("fetchProducts");
});
</script>
