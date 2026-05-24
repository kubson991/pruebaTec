<script setup lang="ts">

import switchNightMode from '@/components/SwitchNightMode.vue';
import { useAppStore } from '@/stores/global-styles-properties';
import { usePaymentOrdersStore } from '@/stores/payment-orders.store';
import { computed, onMounted,onUnmounted } from 'vue';
import { useRoute,useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()

const appStore = useAppStore()
const paymentStore = usePaymentOrdersStore()

const isLoading = computed(() => paymentStore.loading || appStore.loading)
const isHome = computed(() => route.path === '/')

const goBackHome = () => {
  router.push('/')
}

const handleKeydown = (event: KeyboardEvent) => {
  const isCommand = event.ctrlKey && event.key.toLowerCase() === 'h'

  if (isCommand) {
    event.preventDefault()
    goBackHome()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

</script>

<template>
    <div class="layout" :class="{darkMode:appStore.darkmode}">
      <header class="layout__header">
        <span class="material-symbols-rounded" v-show="!isHome" @click="goBackHome">
          chevron_backward
          </span>
        <switchNightMode />
      </header>
  
      <main class="layout__content">
        <RouterView />
      </main>
<div class="loaderContainer"
v-show="isLoading"

>
  <div
  class="loader"
>
</div>
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
    position: relative;

    header{
      display: flex;
      align-items: center;
      justify-content: center;
      height:8rem;
      padding: 1rem;
      background-color: var(--blue-800);
      position: relative;
      span{
        position: absolute;
        left: 1rem;
        margin: auto;
        cursor: pointer;
        font-size: 3rem;
        color: var(--base-white);
      }
    }
    main{
      flex: 1;
      overflow: scroll;
    }
    .loaderContainer{
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--base-white);
      opacity: 0.98;
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

  }
  </style>