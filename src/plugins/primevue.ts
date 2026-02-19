import { type App } from 'vue'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/material'
import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'

export function setupPrimeVue(app: App) {
    app.use(PrimeVue, {
        theme: {
            preset: Aura,
            options: {
                prefix: 'p',
                darkModeSelector: '.dark',
            },
        },
    })

    app.use(ToastService)

    app.component('Toast', Toast)
}
