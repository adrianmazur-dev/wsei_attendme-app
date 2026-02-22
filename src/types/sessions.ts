import type { AttendmeSchemas } from '@/backend'

export type StudentSessionItem = AttendmeSchemas['CourseSessionListItem'] & {
    isAttended: boolean
}

export type TeacherSessionItem = AttendmeSchemas['CourseSessionListItem'] & {
    attendanceList: AttendmeSchemas['CourseSessionAttendanceRecord'][]
}
