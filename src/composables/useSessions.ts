import { ref } from 'vue'
import { attendmeClient, type AttendmeSchemas } from '@/backend'

export function useSessions() {
    const isLoading = ref(false)
    const sessions = ref<AttendmeSchemas['CourseSessionListItem'][]>([])

    async function fetchSessions(page: number = 1, size: number = 9999) {
        isLoading.value = true

        try {
            const { data } = await attendmeClient.send(
                attendmeClient.POST('/course/student/sessions/get', {
                    body: {
                        pageNumber: page,
                        pageSize: size,
                    },
                }),
            )
            sessions.value = data.items
        } catch {
            sessions.value = []
        } finally {
            isLoading.value = false
        }
    }

    return {
        isLoading,
        sessions,
        fetchSessions,
    }
}
