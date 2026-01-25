import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { UserRole } from '@/types/UserRole'


export const useAuthStore = defineStore('auth', () => {

    const token = ref<string | null>(null)
    const role = ref<UserRole | null>(null)

    return {
        token,
        role
    }
})
