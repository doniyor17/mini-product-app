<template>
  <div class="text-center mt-10">
    <h2>404</h2>
    <p>Page not found</p>
    <div>
      <router-link :to="{ name: RT_HOME }">Back to home page</router-link>
    </div>
  </div>
</template>

<script setup>
import { RT_HOME } from "../constants/routeNames";
</script>
