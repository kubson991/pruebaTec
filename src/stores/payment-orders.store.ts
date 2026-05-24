import { getPaymentOrders } from '@/services/payment-orders.service'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import type {
  GetPaymentOrdersParams,
} from '@/services/payment-orders.service'

import { createPaymentOrder } from '@/services/payment-orders.service'
import type {
  CreatePaymentOrderPayload,
  PaymentOrder,
} from '@/types/payment-order.types'

const INITIAL_PAGE = 1

const showAlert = (message: string) => {
 const ok =confirm(message)
  if(ok){
    window.location.reload()
}
}



export const usePaymentOrdersStore = defineStore(
  'paymentOrders',
  () => {

    const route = useRoute()
    const router = useRouter()
    
const getEffectiveFilters = (
  filters?: GetPaymentOrdersParams
): GetPaymentOrdersParams => {
  const urlFilters = route.query

  const basicFilters = {
    supplierName:
      filters?.supplierName ??
      (urlFilters.supplierName as string) ??
      '',

    status:
      filters?.status ??
      (urlFilters.status as string) ??
      '',
  }

return basicFilters

}
const syncFiltersToUrl = (
  filters: GetPaymentOrdersParams
) => {
  router.replace({
    query: {
      ...route.query,
      ...filters,
    },
  })
}
    const paymentOrders =
      ref<PaymentOrder[]>([])

    const totalElements =
      ref<number>(0)

    const hasNext =
      ref<boolean>(false)

    const currentPage =
      ref<number>(INITIAL_PAGE)

    const loading =
      ref<boolean>(false)


    const resetState = (): void => {

      paymentOrders.value = []

      totalElements.value = 0

      hasNext.value = false

      currentPage.value = INITIAL_PAGE
    }


    const fetchPaymentOrders = async (
      filters?: GetPaymentOrdersParams
    ): Promise<void> => {
      if (loading.value) return
    
      try {
        loading.value = true
    
        const finalFilters = getEffectiveFilters(filters)
    
        syncFiltersToUrl(finalFilters)
    
        const page =
          finalFilters.page ?? currentPage.value
    
        const response = await getPaymentOrders({
          ...finalFilters,
          page,
        })
    
        paymentOrders.value.push(...response.data)
    
        totalElements.value = response.items
    
        hasNext.value = response.next !== null
    
        currentPage.value = page + 1
      }catch (error) {

        console.error('Error fetching payment orders:', error)
        showAlert('Error obteniendo los datos de las órdenes de pago. Quieres intenar de nuevo?.')
      } finally {
        loading.value = false
      }
    }
    const refreshPaymentOrders = async (
      filters?: GetPaymentOrdersParams
    ): Promise<void> => {

      resetState()

      await fetchPaymentOrders({
        ...filters,
        page: INITIAL_PAGE,
      })
    }

    const createPaymentOrderAction = async (
      payload: CreatePaymentOrderPayload
    ): Promise<void> => {
      try {
        loading.value = true
        const newOrder = await createPaymentOrder(payload)
        paymentOrders.value.unshift(newOrder)
    
        totalElements.value += 1
      }catch (error) {
        console.error('Error fetching payment orders:', error)
        alert('Error creando la órden de pago.')
      } finally {
        loading.value = false
      }
    }
    return {

      // state
      paymentOrders,
      totalElements,
      hasNext,
      currentPage,
      loading,

      // actions
      fetchPaymentOrders,
      refreshPaymentOrders,
      resetState,
      createPaymentOrderAction
    }
  }
)