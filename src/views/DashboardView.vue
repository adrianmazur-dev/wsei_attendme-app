<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import { useUserStore } from '@/stores/useUserStore'
import { UserRole } from '@/types/enums'

const userStore = useUserStore()

const StudentDashboard = defineAsyncComponent(
    () => import('@/views/student/StudentDashboardView.vue'),
)
const LecturerDashboard = defineAsyncComponent(
    () => import('@/views/lecturer/LecturerDashboardView.vue'),
)

const currentView = computed(() => {
    if (userStore.role === UserRole.Lecturer) return LecturerDashboard
    if (userStore.role === UserRole.Student) return StudentDashboard
    return null
})
</script>

<template>
    <component :is="currentView" v-if="currentView" />
    <div v-else>Loading dashboard...</div>
</template>
