import type { PaymentOrder } from '@/types/payment-order.types'

const API_URL = 'http://localhost:3001'
const ARTIFICIAL_DELAY_MS = 900
export interface GetPaymentOrdersParams {
  status?: string
  supplierName?: string

  page?: number
  limit?: number
}

export interface PaymentOrdersResponse {

    first: number
    prev: number | null
    next: number | null
    last: number
    pages: number
    items: number
    data: PaymentOrder[]
  
}

export const getPaymentOrders = async (
  filters?: GetPaymentOrdersParams
): Promise<PaymentOrdersResponse> => {

  const params = new URLSearchParams()

  // =========================
  // FILTERS
  // =========================

  if (filters?.status) {
    params.append('status', filters.status)
  }

  if (filters?.supplierName) {
    params.append(
      'supplierName_contains',
      filters.supplierName
    )
  }

  // =========================
  // PAGINATION
  // =========================

  params.append(
    '_page',
    String(filters?.page ?? 1)
  )

  params.append(
    '_per_page',
    String(filters?.limit ?? 25)
  )

  const response = await fetch(
    `${API_URL}/paymentOrders?${params.toString()}`
  )

  if (!response.ok) {
    throw new Error('Error fetching payment orders')
  }

  const responseJSON: PaymentOrdersResponse =
  await response.json()

await new Promise((resolve) => {

  setTimeout(() => {

    console.log(
      'Artificial delay of',
      ARTIFICIAL_DELAY_MS,
      'ms'
    )

    resolve(true)

  }, ARTIFICIAL_DELAY_MS)

})

return responseJSON
  
}