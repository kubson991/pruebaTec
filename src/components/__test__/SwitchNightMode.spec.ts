import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'

import { useAppStore } from '@/stores/global-styles-properties'
import SwitchNightMode from '../SwitchNightMode.vue'

describe('CustomSwitch', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    const createWrapper = () => {
        return mount(SwitchNightMode, {
            global: {
                plugins: [createPinia()],
            },
        })
    }

    it('should render switch input', () => {
        const wrapper = createWrapper()

        const input = wrapper.find('input')

        expect(input.exists()).toBe(true)
    })

    it('should toggle darkmode when clicked', async () => {
        const wrapper = createWrapper()

        const store = useAppStore()

        const input = wrapper.find('input')

        expect(store.darkmode).toBeFalsy()

        await input.setValue(true)

        expect(store.darkmode).toBe(true)
    })

    it('should sync state from store to checkbox', async () => {
        const store = useAppStore()

        store.darkmode = true

        const wrapper = createWrapper()

        const input = wrapper.find('input')

        expect((input.element as HTMLInputElement).checked).toBe(true)
    })

    it('should toggle back to false', async () => {
        const wrapper = createWrapper()

        const store = useAppStore()


        const input = wrapper.find('input')
        if (!!store.darkmode) {
            
            await input.setValue(false)

            expect(store.darkmode).toBe(false)
        } else {

            await input.setValue(true)

            expect(store.darkmode).toBe(true)
        }
    })
})