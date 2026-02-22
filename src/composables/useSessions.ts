import { ref } from 'vue'
import { attendmeClient, type AttendmeSchemas } from '@/backend'
import { useRouter } from 'vue-router'
import { UserRole } from '@/types/enums'

export type CourseSessionItem = AttendmeSchemas['CourseSessionListItem'] & {
    isAttended?: boolean
}

export function useSessions() {
    const router = useRouter()
    const isLoading = ref(false)

    async function getFilteredSessions(
        role: UserRole,
        params: AttendmeSchemas['CourseSessionListFiltersPagedListParams'],
    ): Promise<AttendmeSchemas['CourseSessionListItem'][]> {
        isLoading.value = true

        try {
            const requests = {
                [UserRole.Student]: () =>
                    attendmeClient.POST('/course/student/sessions/get', {
                        body: params,
                    }),
                [UserRole.Teacher]: () =>
                    attendmeClient.POST('/course/teacher/sessions/get', {
                        body: params,
                    }),
            }

            const { data } = await attendmeClient.send(requests[role]())
            return data?.items ?? []
        } finally {
            isLoading.value = false
        }
    }

    async function getStudentSessions(courseGroupId: number): Promise<CourseSessionItem[]> {
        isLoading.value = true

        try {
            const { data: sessionsData } = await attendmeClient.send(
                attendmeClient.GET('/course/student/group/sessions/get', {
                    params: {
                        query: { courseGroupId },
                    },
                }),
            )

            const { data: attendanceData } = await attendmeClient.send(
                attendmeClient.GET('/course/student/attendance/get', {
                    params: {
                        query: { courseGroupId },
                    },
                }),
            )

            const attendedSessionIds = new Set(
                attendanceData?.map((item) => item.courseSessionId) ?? [],
            )

            return (sessionsData ?? []).map((session) => ({
                ...session,
                isAttended: attendedSessionIds.has(session.courseSessionId),
            }))
        } finally {
            isLoading.value = false
        }
    }

    function openSession(session: AttendmeSchemas['CourseSessionListItem']) {
        router.push({
            name: 'student-session-details',
            params: { courseGroupId: session.courseGroupId, sessionId: session.courseSessionId },
        })
    }

    return { isLoading, getFilteredSessions, getStudentSessions, openSession }
}
