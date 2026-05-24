// src/stores/app.store.ts

import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

const DARK_MODE_KEY = 'darkmode'

export const useAppStore = defineStore('app', () => {

  const loading = ref(false)
  const tableMode= ref(false)
  const darkmode = ref(
    localStorage.getItem(DARK_MODE_KEY) === 'true'
  )

  const setLoading = (value: boolean) => {
    loading.value = value
  }

  const setTableMode = (value: boolean) => {
    tableMode.value = value
  }

  const toggleDarkmode = () => {
    darkmode.value = !darkmode.value
  }

  const setDarkmode = (value: boolean) => {
    darkmode.value = value
  }

  // =========================================
  // PERSIST DARKMODE
  // =========================================

  watch(
    darkmode,
    (value) => {
      localStorage.setItem(DARK_MODE_KEY, String(value))

      // opcional:
      document.documentElement.classList.toggle(
        'dark',
        value
      )
    },
    { immediate: true }
  )

  return {
    // state
    loading,
    darkmode,
    tableMode,

    // actions
    setLoading,
    toggleDarkmode,
    setDarkmode,
    setTableMode
  }
})