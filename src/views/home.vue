<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";
import Filters from "@/components/filters.vue";
import InfoCardList from "@/components/mobile/InfoCardList.vue";
import Table from "@/components/desktop/Table.vue";
import type { PaymentOrder } from "@/types/payment-order.types";
import { usePaymentOrdersStore } from "@/stores/payment-orders.store";
import { useAppStore } from "@/stores/global-styles-properties";

const paymentStore = usePaymentOrdersStore();
const appStore = useAppStore();


const SCROLL_OFFSET = 300;
const MOBILE_QUERY = "(max-width: 768px)";
let mediaQuery: MediaQueryList;

const handleScreenChange = (e: MediaQueryListEvent | MediaQueryList) => {
    if (e.matches) {
    appStore.tableMode = false;
    }

};

const tableColumns = [
  { key: "id", label: "ID" },
  { key: "supplierName", label: "Proveedor" },
  { key: "amount", label: "Monto" },
  { key: "concept", label: "Concepto" },
  {
    key: "status",
    label: "Estado",
    render: (row: PaymentOrder) =>
      `<span class="status status--${row.status.toUpperCase()}">${row.status}</span>`,
  },
];
const getScrollContainer = (): HTMLElement | null => {
  return document.querySelector(".layout__content");
};

const shouldLoadNextPage = (element: HTMLElement): boolean => {
  const scrollTop = element.scrollTop;

  const containerHeight = element.clientHeight;

  const contentHeight = element.scrollHeight;

  return scrollTop + containerHeight >= contentHeight - SCROLL_OFFSET;
};

const handleScroll = async (): Promise<void> => {
  const scrollContainer = getScrollContainer();

  if (!scrollContainer) {
    return;
  }

  const canLoadMore = paymentStore.hasNext && !paymentStore.loading;

  if (shouldLoadNextPage(scrollContainer) && canLoadMore) {
    await paymentStore.fetchPaymentOrders({ page: paymentStore.currentPage + 1 });
  }
};

onMounted(async () => {
  await paymentStore.fetchPaymentOrders();

  const scrollContainer = getScrollContainer();

  scrollContainer?.addEventListener("scroll", handleScroll);

  mediaQuery = window.matchMedia(MOBILE_QUERY);

    handleScreenChange(mediaQuery);

    mediaQuery.addEventListener("change", handleScreenChange);
});

onUnmounted(() => {
  const scrollContainer = getScrollContainer();

  scrollContainer?.removeEventListener("scroll", handleScroll);

  mediaQuery.removeEventListener("change", handleScreenChange);
});
</script>

<template>
  <section class="home">
    <Filters />
    <Table :columns="tableColumns" :items="paymentStore.paymentOrders"  v-if="appStore.tableMode"/>
    <InfoCardList :orders="paymentStore.paymentOrders" v-else/>
    <div v-show="!paymentStore.hasNext" class="home__end color-primary">
      No hay más órdenes
    </div>
  </section>
</template>

<style scoped lang="scss">
.home {
  padding: 1rem;

  &__loading,
  &__end {
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 24px;

    font-size: 14px;
  }
}
</style>
