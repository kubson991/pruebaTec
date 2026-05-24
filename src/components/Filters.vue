<script setup lang="ts">
import { ref, watch } from "vue";
import { usePaymentOrdersStore } from "@/stores/payment-orders.store";
import { useAppStore } from "@/stores/global-styles-properties";
import { paymentOrderStatus } from "@/types/payment-order.types";
import { useRouter } from "vue-router";

const paymentStore = usePaymentOrdersStore();
const appStore = useAppStore();

const router = useRouter();
const queries = router.currentRoute.value.query;

const providerName = ref<string>((queries.supplierName as string) || "");
const state = ref<string>((queries.status as string) || "");

const debounce = (fn: Function, delay = 850) => {
  let timeout: ReturnType<typeof setTimeout>;

  return (...args: any[]) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};

const setActiveTable = () => {
  appStore.setTableMode(!appStore.tableMode);
};

const fetchWithFilters = () => {
  paymentStore.refreshPaymentOrders({
    supplierName:  providerName.value.trim(),
    status: state.value,
  });
};

const debouncedFetch = debounce(() => {
  fetchWithFilters();
}, 500);

const navigateToCreate = () => {
  router.push("/create");
};


watch(providerName, () => {
  debouncedFetch();
});

watch(state, () => {
  fetchWithFilters();
});
</script>
<template>
  <div class="filters">
    <div class="inputContainer">
      <div class="ginko-input">
        <label>Proveedor</label>

        <span class="material-symbols-rounded"> home_work </span>
        <input type="text" placeholder="Escribe el proveedor" v-model="providerName"  :disabled="paymentStore.loading"/>

      </div>
    </div>

    <select class="ginko-selector" v-model="state">
      <option value="" selected>Todos</option>

      <option v-for="item in paymentOrderStatus" :key="item" :value="item">
        {{ item }}
      </option>
    </select>

    <button class="ginko-button--line" :class="{active:appStore.tableMode}" @click="setActiveTable">
      <span class="material-symbols-rounded" v-if="appStore.tableMode"> grid_on </span>
      <span class="material-symbols-rounded" v-else>
        grid_off
        </span>
    </button>
    <button class="ginko-button"  @click="navigateToCreate">
        Crear
    </button>
  </div>
</template>
<style scoped lang="scss">
 @use "../styles/responsive.scss" as *;
.filters {
  max-width: 100rem;
  padding: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 1.6rem;

  .inputContainer {
    flex: 1;
  }
  select {
    min-width: 16rem;
    transform: translateY(-2px);

  }
  .ginko-button--line{
    @include max(md){
        display: none;
    }
  }
  button.ginko-button--line span{
    float: unset;
    transform: none;
}
}
</style>
