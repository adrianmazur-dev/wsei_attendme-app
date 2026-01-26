import { ref } from 'vue'

import { defineStore } from 'pinia'
import { attendmeClient } from '@/api'

export const useAuthStore = defineStore('auth', () => {
    const token = ref<string | null>(null)


    async function userLogin(loginName: string, password: string): Promise<void> {
        const { data, response } = await attendmeClient.send(
            attendmeClient.POST('/user/login', {
                params: { query: { loginName, password } }
            })
        )

        token.value = data.token || null
    }


    return {
        token,
        userLogin
    }
})
