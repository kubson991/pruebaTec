export const paymentOrderStatus = {
    DRAFT: 'BORRADOR',
    APPROVED: 'APROBADA',
    REJECTED: 'RECHAZADA',
    PAID: 'PAGADA',
  } as const

  export type PaymentOrderStatusType =
  (typeof paymentOrderStatus)[keyof typeof paymentOrderStatus]


  export interface PaymentOrder {
    id: number | string
    supplierName: string
    amount: number
    concept: string
    createdAt: string
    status: PaymentOrderStatusType
  }

  export interface CreatePaymentOrderPayload {
    supplierName: string
    amount: number
    concept: string
    status?: string
    createdAt?: string
  }