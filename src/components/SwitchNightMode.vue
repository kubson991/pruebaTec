<script setup lang="ts">
import {computed} from 'vue'

import { useAppStore } from '@/stores/global-styles-properties'

const appStore = useAppStore()

const checked = computed({
  get: () => appStore.darkmode,
  set: (value: boolean) => appStore.setDarkmode(value)
})
</script>

<template>
    
  <label class="custom-switch">
    <input
      v-model="checked"
      type="checkbox"
      class="custom-switch__input"
    >

    <span class="custom-switch__slider" />
  </label>
</template>

<style scoped lang="scss">
.custom-switch {
  position: relative;
    scale: 1.2;
  display: inline-flex;
  align-items: center;

  width: 7rem;
  height: 4rem;

  cursor: pointer;

  &__input {
    display: none;
  }

  &__slider {
    position: relative;

    width: 100%;
    height: 100%;

    border-radius: 999px;

    background: #d1d5db;

    transition: background 0.25s ease;

    &::before {
      content: '';

      position: absolute;
      top: 4px;
      left: 4px;

      height: 3.2rem;
      aspect-ratio:1/1;

      border-radius: 50%;
        background-image: url(@/assets/light.gif);
        background-size: cover;
 

      box-shadow:
        0 2px 6px rgba(0, 0, 0, 0.2);

      transition:
        transform 0.25s ease;
    }
  }

  &__input:checked + &__slider {
    background: #111827;
    &::before {
      background-image: url(@/assets/dark.gif);
    }
  }

  &__input:checked + &__slider::before {
    transform: translateX(30px);
  }
}
</style>