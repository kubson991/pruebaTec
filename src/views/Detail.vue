<script setup lang="ts">
import { useRoute} from "vue-router";
import { usePaymentOrdersStore } from "@/stores/payment-orders.store";
import type { PaymentOrder ,PaymentOrderStatusType} from "@/types/payment-order.types";
import PaymentOrderCard from "@/components/mobile/InfoCard.vue";


import { onBeforeMount, ref, computed } from "vue";

const paymentOrdersStore = usePaymentOrdersStore();

const route = useRoute();

const id = route.params.id;

const order = ref<null | PaymentOrder>(null);

const findOrder = (): PaymentOrder | undefined => {
  return paymentOrdersStore.paymentOrders.find((order) => order.id === id);
};
onBeforeMount(async () => {
  const orderFinded = findOrder();
  if (!orderFinded) {
    const response = await paymentOrdersStore.fetchPaymentOrderById(id as string);
    order.value = response || null;
  } else {
    order.value = findOrder() || null;
  }
});

const allowedTransitions = computed(() => {
  if (!order.value) return [];

  switch (order.value.status) {
    case "BORRADOR":
      return ["APROBADA", "RECHAZADA"];
    case "APROBADA":
      return ["PAGADA"];
    default:
      return [];
  }
});

const canTransitionTo = (status: string) => {
  return allowedTransitions.value.includes(status)
}

const updateStatus = (newStatus: PaymentOrderStatusType) => {
  if (!order.value) return;
    const ok = confirm(`¿Estás seguro de que deseas cambiar el estado a ${newStatus}?`);
    if (ok) {
      paymentOrdersStore.updateStatus(order.value.id, newStatus);
      order.value.status = newStatus;
    }
}
</script>
<template>
  <section>
    <h1 class="h2 sm:h1 color-primary">Ver detalle</h1>
    <PaymentOrderCard v-if="order" :order="order" />
    <section v-if="order?.status !=='PAGADA' && order?.status !=='RECHAZADA'">
      <h4 class="color-primary">Cambiar estado</h4>
      <article>
        <button
        class="ginko-button"
        v-if="canTransitionTo('APROBADA')"
        @click="updateStatus( 'APROBADA')"
      >
        Aprobar
      </button>
    
      <button
      class="ginko-button--line"
        v-if="canTransitionTo('RECHAZADA')"
        @click="updateStatus('RECHAZADA')"
      >
        Rechazar
      </button>
    
      <button
      class="ginko-button"
        v-if="canTransitionTo('PAGADA')"
        @click="updateStatus( 'PAGADA')"
      >
        Marcar como pagada
      </button>
      </article>

    </section>
  </section>
</template>
<style lang="scss" scoped>
section {
  padding: 2rem;
  h1 {
    margin-bottom: 2rem;
  }
  article{
    margin-top: 4rem;
    display: flex;
    justify-content: space-evenly;
  }
  h4{
    margin-top: 2rem;
  }
}
</style>
