import { ref } from 'vue'

import { defineStore } from 'pinia'
import { attendmeClient } from '@/api'

export const useAuthStore = defineStore('auth', () => {
    const token = ref<string | null>(null)
    const expires = ref<number | null>(null)


    async function userLogin(loginName: string, password: string): Promise<void> {
        const { data, response } = await attendmeClient.send(
            attendmeClient.POST('/user/login', {
                params: { query: { loginName, password } }
            })
        )

        token.value = data.token || null
        if (data.expires) {
            expires.value = new Date(data.expires).getTime()
        }
    }

    const isAuthenticated = (): boolean => {
        if (!token.value || !expires.value) return false;
        return Date.now() < expires.value;
    };

    return {
        token,
        expires,
        isAuthenticated,
        userLogin,
    }
}, {
    persist: true,
})
