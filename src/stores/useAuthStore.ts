import { computed, ref } from 'vue'

import { defineStore } from 'pinia'
import { attendmeClient } from '@/backend'

export const useAuthStore = defineStore(
    'auth',
    () => {
        const token = ref<string | null>(null)
        const expires = ref<number | null>(null)

        const isAuthenticated = computed(() => {
            if (!token.value || !expires.value) return false
            return Date.now() < expires.value
        })

        async function userLogin(loginName: string, password: string): Promise<void> {
            const { data } = await attendmeClient.send(
                attendmeClient.POST('/user/login', {
                    params: { query: { loginName, password } },
                }),
            )

            token.value = data.token || null
            if (data.expires) {
                expires.value = new Date(data.expires).getTime()
            }
        }

        const logout = (): void => {
            token.value = null
            expires.value = null
        }

        return {
            token,
            expires,
            isAuthenticated,
            userLogin,
            logout,
        }
    },
    {
        persist: true,
    },
)
