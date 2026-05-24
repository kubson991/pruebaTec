<script setup lang="ts">
import PaymentOrderCard from '@/components/mobile/InfoCard.vue'

import type { PaymentOrder } from '@/types/payment-order.types'

interface Props {
  orders: PaymentOrder[]
}

defineProps<Props>()

</script>

<template>
  <section class="payment-orders-list">
    <PaymentOrderCard
      v-for="order in orders"
      :key="order.id"
      :order="order"
    />
  </section>
</template>

<style scoped lang="scss">
.payment-orders-list {
  display: grid;
  grid-template-columns: repeat(
    auto-fill,
    minmax(320px, 1fr)
  );

  gap: 20px;

  width: 100%;
  height: auto;
  overflow: visible;
}
</style>