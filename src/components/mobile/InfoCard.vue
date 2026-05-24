<script setup lang="ts">
import type { PaymentOrder } from '@/types/payment-order.types'

interface Props {
  order: PaymentOrder
}

defineProps<Props>()

const formatCurrency = (value: number) => {
  return value.toLocaleString('es-CO', {
    style: 'currency',
    currency: 'COP',
  })
}
</script>

<template>
  <article class="payment-order-card">
    <div class="payment-order-card__header">
      <h6 class="color-primary">
        {{ order.supplierName }}
      </h6>

      <span
        class="payment-order-card__status  button-sm-bold"
        :class="`payment-order-card__status--${order.status}`"
      >
        {{ order.status }}
      </span>
    </div>

    <div class="payment-order-card__content">
      <p>
        <strong class="color-primary">ID:</strong>
        {{ order.id }}
      </p>

      <p>
        <strong class="color-primary">Monto:</strong>
        {{ formatCurrency(order.amount) }}
      </p>

      <p>
        <strong class="color-primary">Concepto:</strong>
        {{ order.concept }}
      </p>

      <p>
        <strong class="color-primary">Fecha:</strong>
        {{ order.createdAt }}
      </p>
    </div>
  </article>
</template>

<style scoped lang="scss">
@use '../../styles/typography.scss' as *;
.payment-order-card {
    background-color: var(--base-white);
  display: flex;
  flex-direction: column;
  gap: 1.6rem;

  padding: 1.6rem;
  border-radius: 1.6rem;

  background: white;

  box-shadow:var(--cardShadow);

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--cardShadowHover);
  }
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 1.6rem;

  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
    overflow: hidden;
    text-overflow: ellipsis;
    @include text-variant(body-sm-regular);
    strong{
        @include text-variant(body-sm-semiBold)
    }
    p{
        color:var(--blue-500)
    }
  }

  &__status {
    padding: 0.6rem 1.2rem;
    border-radius: 10rem;
    &--BORRADOR {
      background: var(--grey-900);
      color: var(--grey-700);
    }

    &--APROBADA {
      background: var(--green-700);
      color: var(--green-1000);
    }

    &--RECHAZADA {
      background: var(--pink-700);
      color: var(--red-900);
    }

    &--PAGADA {
      background: var(--blue-700);
      color: var(--blue-1000);
    }
  }
}

</style>