import { ref } from 'vue'
import { attendmeClient, type AttendmeSchemas } from '@/backend'
import { useRouter } from 'vue-router'
import { UserRole } from '@/types/enums'
import type { StudentSessionItem, TeacherSessionItem } from '@/types/sessions'

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

    async function getStudentSessions(courseGroupId: number): Promise<StudentSessionItem[]> {
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

    async function getTeacherSession(sessionId: number): Promise<TeacherSessionItem> {
        isLoading.value = true

        try {
            const { data: sessionData } = await attendmeClient.send(
                attendmeClient.GET('/course/teacher/session/get', {
                    params: { query: { sessionId: sessionId } },
                }),
            )

            const { data: attendanceData } = await attendmeClient.send(
                attendmeClient.GET('/course/session/attendance-list/get', {
                    params: { query: { sessionId: sessionId } },
                }),
            )

            return {
                ...sessionData,
                attendanceList: attendanceData,
            }
        } finally {
            isLoading.value = false
        }
    }

    async function toggleSessionAttendance(
        attenderId: number,
        sessionId: number,
        shouldAttend: boolean,
    ) {
        isLoading.value = true

        try {
            await attendmeClient.send(
                attendmeClient.GET('/course/session/attendance/toggle', {
                    params: {
                        query: {
                            courseSessionId: sessionId,
                            attendingUserId: attenderId,
                            addOrRemove: shouldAttend,
                        },
                    },
                }),
            )
        } finally {
            isLoading.value = false
        }
    }

    function openStudentSession(session: AttendmeSchemas['CourseSessionListItem']) {
        router.push({
            name: 'student-session-details',
            params: { courseGroupId: session.courseGroupId, sessionId: session.courseSessionId },
        })
    }

    function openTeacherSession(session: AttendmeSchemas['CourseSessionListItem']) {
        router.push({
            name: 'teacher-session-details',
            params: { courseGroupId: session.courseGroupId, sessionId: session.courseSessionId },
        })
    }

    return {
        isLoading,
        getFilteredSessions,
        getStudentSessions,
        toggleSessionAttendance,
        getTeacherSession,
        openStudentSession,
        openTeacherSession,
    }
}
