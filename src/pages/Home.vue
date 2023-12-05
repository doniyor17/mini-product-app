<template>
  <div class="text-center text-3xl">Home</div>
  <div
    v-if="loading"
    class="relative"
  >
    <Loading />
  </div>
  <div v-else>
    <div>
      <input
        type="text"
        v-model="searchingTitle"
        @input.enter="onSearchProducts"
      />
    </div>
    <div v-for="product of products">
      {{ get(product, "title", "Product title") }}
    </div>
  </div>
</template>

<script setup>
import { useHome } from "../composables/home";
import Loading from "../components/Loading.vue";
import { NSelect } from "naive-ui";
import MultiSelect from "@vueform/multiselect";

const { products, loading, searchingTitle, onSearchProducts } = useHome();
import { get } from "lodash";
</script>

<style lang="scss" scoped></style>
