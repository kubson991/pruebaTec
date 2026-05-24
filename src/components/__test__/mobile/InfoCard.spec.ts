import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

import PaymentOrderCard from '../../mobile/InfoCard.vue'

import type { PaymentOrder } from '@/types/payment-order.types'

describe('PaymentOrderCard', () => {
  const mockOrder: PaymentOrder = {
    id: 1,

    supplierName: 'Tecnologia SAS',

    amount: 2500000,

    concept: 'Compra de equipos',

    createdAt: '2026-05-23',

    status: 'APROBADA',
  }

  const createWrapper = () => {
    return mount(PaymentOrderCard, {
      props: {
        order: mockOrder,
      },
    })
  }

  it('should render supplier name', () => {
    const wrapper = createWrapper()

    expect(wrapper.text()).toContain(
      'Tecnologia SAS'
    )
  })

  it('should render order id', () => {
    const wrapper = createWrapper()

    expect(wrapper.text()).toContain('1')
  })

  it('should render concept', () => {
    const wrapper = createWrapper()

    expect(wrapper.text()).toContain(
      'Compra de equipos'
    )
  })

  it('should render formatted currency', () => {
    const wrapper = createWrapper()

    const formattedAmount =
      mockOrder.amount.toLocaleString('es-CO', {
        style: 'currency',
        currency: 'COP',
      })

    expect(wrapper.text()).toContain(
      formattedAmount
    )
  })

  it('should render created date', () => {
    const wrapper = createWrapper()

    expect(wrapper.text()).toContain(
      '2026-05-23'
    )
  })

  it('should render status', () => {
    const wrapper = createWrapper()

    expect(wrapper.text()).toContain(
      'APROBADA'
    )
  })

  it('should apply correct status class', () => {
    const wrapper = createWrapper()

    const statusElement = wrapper.find(
      '.payment-order-card__status'
    )

    expect(statusElement.classes()).toContain(
      'payment-order-card__status--APROBADA'
    )
  })

  it('should render article container', () => {
    const wrapper = createWrapper()

    expect(
      wrapper.find('.payment-order-card').exists()
    ).toBe(true)
  })
})