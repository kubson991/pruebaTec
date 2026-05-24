import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import { createTestingPinia } from '@pinia/testing'
import { createRouter, createMemoryHistory } from 'vue-router'
import CreateView from '@/views/Create.vue'
import { usePaymentOrdersStore } from '@/stores/payment-orders.store'

const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: '/', name: 'home', component: {} }],
  })
  
  router.push = vi.fn()

  const mountComponent = () => {
    return mount(CreateView, {
      global: {
        plugins: [
          createTestingPinia({
            createSpy: vi.fn,
          }),
          router,
        ],
      },
    })
  }

  it('should render form inputs', () => {
    const wrapper = mountComponent()
  
    expect(wrapper.findAll('input').length).toBe(3)
  })

  it('should disable submit button initially', () => {
    const wrapper = mountComponent()
  
    const button = wrapper.find('button')
  
    expect(button.attributes('disabled')).toBeDefined()
  })

  it('should enable button when form is valid', async () => {
    const wrapper = mountComponent()
  
    const inputs = wrapper.findAll('input')
  
    await inputs[0].setValue('Proveedor test')
    await inputs[1].setValue('1000')
    await inputs[2].setValue('Concepto test largo')
  
    const button = wrapper.find('button')
  
    expect(button.attributes('disabled')).toBeUndefined()
  })

  it('should call store on submit', async () => {
    const wrapper = mountComponent()
  
    const store = usePaymentOrdersStore()
    store.createPaymentOrderAction = vi.fn()
  
    await wrapper.findAll('input')[0].setValue('Proveedor')
    await wrapper.findAll('input')[1].setValue('1000')
    await wrapper.findAll('input')[2].setValue('Concepto')
  
    await wrapper.find('form').trigger('submit.prevent')
  
    expect(store.createPaymentOrderAction).toHaveBeenCalled()
  })