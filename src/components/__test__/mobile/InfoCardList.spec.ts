import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import InfoCardList from '../../mobile/InfoCardList.vue'

import type { PaymentOrder } from '@/types/payment-order.types'
import PaymentOrderCard from '../../mobile/InfoCard.vue'

describe('InfoCardList', () => {
  const mockOrders: PaymentOrder[] = [
    {
      id: 1,

      supplierName: 'Tecnologia SAS',

      amount: 2500000,

      concept: 'Compra de equipos',

      createdAt: '2026-05-23',

      status: 'APROBADA',
    },

    {
      id: 2,

      supplierName: 'Cloud Services',

      amount: 800000,

      concept: 'Infraestructura AWS',

      createdAt: '2026-05-20',

      status: 'BORRADOR',
    },
  ]

  const createWrapper = () => {
    return mount(InfoCardList, {
      props: {
        orders: mockOrders,
      },
    })
  }

  it('should render list container', () => {
    const wrapper = createWrapper()

    expect(
      wrapper.find('.payment-orders-list').exists()
    ).toBe(true)
  })

  it('should render all payment cards', () => {
    const wrapper = createWrapper()

    const cards = wrapper.findAllComponents(PaymentOrderCard)

    expect(cards.length).toBe(2)
  })

  it('should render supplier names', () => {
    const wrapper = createWrapper()

    expect(wrapper.text()).toContain(
      'Tecnologia SAS'
    )

    expect(wrapper.text()).toContain(
      'Cloud Services'
    )
  })

  it('should render concepts', () => {
    const wrapper = createWrapper()

    expect(wrapper.text()).toContain(
      'Compra de equipos'
    )

    expect(wrapper.text()).toContain(
      'Infraestructura AWS'
    )
  })

  it('should render statuses', () => {
    const wrapper = createWrapper()

    expect(wrapper.text()).toContain(
      'APROBADA'
    )

    expect(wrapper.text()).toContain(
      'BORRADOR'
    )
  })

  it('should receive orders prop correctly', () => {
    const wrapper = createWrapper()

    expect(wrapper.props('orders')).toEqual(
      mockOrders
    )
  })

  it('should render empty state correctly', () => {
    const wrapper = mount(InfoCardList, {
      props: {
        orders: [],
      },
    })

    const cards = wrapper.findAll(
      '.payment-order-card'
    )

    expect(cards.length).toBe(0)
  })
})