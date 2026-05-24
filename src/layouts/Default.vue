<script setup lang="ts">

import switchNightMode from '@/components/switchNightMode.vue';
import { useAppStore } from '@/stores/global-styles-properties';
import { usePaymentOrdersStore } from '@/stores/payment-orders.store';
import { computed } from 'vue';
const appStore = useAppStore()
const paymentStore = usePaymentOrdersStore()
const isLoading = computed(() => paymentStore.loading || appStore.loading)

</script>

<template>
    <div class="layout" :class="{darkMode:appStore.darkmode}">
      <header class="layout__header">
        <switchNightMode />
      </header>
  
      <main class="layout__content"
      v-show="!isLoading"
      
      >
        <RouterView />
      </main>

      <div
      v-show="isLoading"
      class="loader"
    >
    </div>
    </div>
  </template>
  
  <style scoped lang="scss">
  .layout{
    position: relative;
    background-color:var(--base-background) ;
    min-height: 100dvh;
    max-height: 100dvh;
    display: flex;
    flex-direction: column;

    header{
      display: flex;
      align-items: center;
      justify-content: center;
      height:8rem;
      padding: 1rem;
    }
    main{
      flex: 1;
      overflow: scroll;
    }
    .loader {
      margin: auto;
      width: 32rem;
      height: 32rem;
    
      background-color: var(--blue-900);
    
      mask: url('@/assets/loader.svg') no-repeat center;
      mask-size: contain;
    
      -webkit-mask: url('@/assets/loader.svg') no-repeat center;
      -webkit-mask-size: contain;
    }
  }
  </style>