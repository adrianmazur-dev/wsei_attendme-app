import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConfigStore = defineStore(
    'config',
    () => {
        const settings = ref({
            backendBaseUrl: 'https://attendme-backend.runasp.net/',
        })

        return { settings }
    },
    {
        persist: true,
    },
)
