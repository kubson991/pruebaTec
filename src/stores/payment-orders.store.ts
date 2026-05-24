import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import type {
  GetPaymentOrdersParams,
} from '@/services/payment-orders.service'

import { createPaymentOrder, getPaymentOrderById, getPaymentOrders, updatePaymentOrderStatus } from '@/services/payment-orders.service'
import type {
  CreatePaymentOrderPayload,
  PaymentOrder,
  PaymentOrderStatusType
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

  const avoidRepeatedItemsById = (paymentOrders:PaymentOrder[])=>{
  const uniqueOrdersMap = new Map<number | string, PaymentOrder>()
    return paymentOrders.filter((order) => {
      if (!uniqueOrdersMap.has(order.id)) {
        uniqueOrdersMap.set(order.id, order)
        return true
      }
      return false
    })
  }

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
    
        paymentOrders.value = avoidRepeatedItemsById([
          ...paymentOrders.value,
          ...response.data
        ])
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
        paymentOrders.value = avoidRepeatedItemsById([
          newOrder,
          ...paymentOrders.value
        ])
        totalElements.value += 1
      }catch (error) {
        console.error('Error fetching payment orders:', error)
        alert('Error creando la órden de pago.')
      } finally {
        loading.value = false
      }
    }

    const fetchPaymentOrderById = async (
      id: number | string
    ): Promise<PaymentOrder | null> => {
      try {
        loading.value = true
        const response = await getPaymentOrderById(id)
    
        return response
      }catch (error) {
        console.error('Error fetching payment order:', error)
        alert('Error obteniendo los datos de la órden de pago.')
        return null
      } finally {
        loading.value = false
      }
    }

const updateStatus = async (
  id: number | string,
  newStatus: PaymentOrderStatusType
): Promise<void> => {
  try {
    loading.value = true
    await updatePaymentOrderStatus(id, newStatus)
    const index = paymentOrders.value.findIndex(
      (order) => order.id === id
    )
    if (index !== -1) {
      const elementToModify=paymentOrders.value[index] as PaymentOrder || undefined
      if (elementToModify) {
        elementToModify.status = newStatus 
  
      }

    }
  } catch (error) {
    console.error('Error updating payment order status:', error)
    alert('Error actualizando el estado de la orden de pago.')

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
      createPaymentOrderAction,
      fetchPaymentOrderById,
      updateStatus
    }
  }
)