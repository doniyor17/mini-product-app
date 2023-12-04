import { computed } from "vue";
import { useStore } from "vuex";

export function useHome() {
  const store = useStore();
  const products = computed(() => store.getters.products);

  return {
    products,
  };
}
