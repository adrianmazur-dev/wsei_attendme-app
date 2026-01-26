import { createApp } from 'vue'
import { createPinia } from 'pinia'

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import App from '@/App.vue'
import router from '@/router/index.ts'
import { BaseError } from './types/errors/base-error';

async function initApp() {
    const app = createApp(App)
    const pinia = createPinia()

    pinia.use(piniaPluginPersistedstate)

    pinia.use(({ store }) => {
        store.$onAction(({ name, onError }) => {
            onError((error) => {
                if (error instanceof BaseError) {
                    error.log();
                }
            });
        });
    });

    window.addEventListener('unhandledrejection', (event) => {
        if (event.reason instanceof BaseError) {
            event.reason.log();
            event.preventDefault();
        }
    });

    app.use(pinia)
    app.use(router)

    app.mount('#app')
}

initApp();