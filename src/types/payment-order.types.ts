export const paymentOrderStatus = {
    DRAFT: 'BORRADOR',
    APPROVED: 'APROBADA',
    REJECTED: 'RECHAZADA',
    PAID: 'PAGADA',
  } as const

  export type PaymentOrderStatusType =
  (typeof paymentOrderStatus)[keyof typeof paymentOrderStatus]


  export interface PaymentOrder {
    id: number
    supplierName: string
    amount: number
    concept: string
    createdAt: string
    status: PaymentOrderStatusType
  }