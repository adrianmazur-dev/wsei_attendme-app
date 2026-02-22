import { attendmeDeviceClient } from '@/backend'
import { onUnmounted, ref } from 'vue'

export function useTickets() {
    const isLoading = ref(false)
    const token = ref<string | null>(null)
    const expires = ref<Date | null>(null)

    let refreshTimeout: ReturnType<typeof setTimeout> | null = null

    async function fetchTicket() {
        isLoading.value = true

        try {
            const { data } = await attendmeDeviceClient.send(
                attendmeDeviceClient.GET('/user/attendance/ticket/get'),
            )

            token.value = data?.token ?? null
            expires.value = data?.expires ? new Date(data.expires) : null

            if (expires.value) {
                refreshTicket(expires.value)
            } else {
                refreshTicket(new Date(Date.now() + 2 * 1000)) // refresh every 2 seconds
            }
        } finally {
            isLoading.value = false
        }
    }

    function refreshTicket(expires: Date) {
        const now = new Date().getTime()
        const diff = expires.getTime() - now

        refreshTimeout = setTimeout(() => {
            fetchTicket()
        }, diff)
    }

    onUnmounted(() => {
        if (refreshTimeout) {
            clearTimeout(refreshTimeout)
        }
    })

    return {
        isLoading,
        token,
        expires,
        fetchTicket,
    }
}
