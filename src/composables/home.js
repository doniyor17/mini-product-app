import { computed, ref } from "vue";
import { useStore } from "vuex";

export function useHome() {
  const store = useStore();
  const loading = computed(() => store.state.loading);
  const products = computed(() => store.getters.products);
  const searchingTitle = ref("");

  async function onSearchProducts() {
    await store.dispatch("searchProducts", searchingTitle.value);
  }

  return {
    products,
    loading,
    searchingTitle,
    onSearchProducts,
  };
}
