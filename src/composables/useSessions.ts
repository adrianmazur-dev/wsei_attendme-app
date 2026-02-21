import { ref } from 'vue'
import { attendmeClient, type AttendmeSchemas } from '@/backend'
import { useRouter } from 'vue-router'
import { UserRole } from '@/types/enums'

export function useSessions() {
    const router = useRouter()
    const isLoading = ref(false)
    const sessions = ref<AttendmeSchemas['CourseSessionListItem'][]>([])

    async function fetchSessions(role: UserRole, page: number = 1, size: number = 9999) {
        isLoading.value = true

        try {
            const requests = {
                [UserRole.Student]: () =>
                    attendmeClient.POST('/course/student/sessions/get', {
                        body: { pageNumber: page, pageSize: size },
                    }),
                [UserRole.Teacher]: () =>
                    attendmeClient.POST('/course/teacher/sessions/get', {
                        body: { pageNumber: page, pageSize: size },
                    }),
            }

            const { data } = await attendmeClient.send(requests[role]())

            sessions.value = data?.items ?? []
        } catch {
            sessions.value = []
        } finally {
            isLoading.value = false
        }
    }

    function getSessionById(sessionId: number) {
        return sessions.value.find((s) => s.courseSessionId === sessionId) || null
    }

    function openSession(session: AttendmeSchemas['CourseSessionListItem']) {
        router.push({
            name: 'student-session-details',
            params: { courseGroupId: session.courseGroupId, sessionId: session.courseSessionId },
        })
    }

    return { isLoading, sessions, fetchSessions, getSessionById, openSession }
}
