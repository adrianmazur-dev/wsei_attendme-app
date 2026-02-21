<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import { useUserStore } from '@/stores/useUserStore'
import { UserRole } from '@/types/enums'
import AppHeader from '@/components/AppHeader.vue'
import AppLoadingState from '@/components/AppLoadingState.vue'

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
    <AppLoadingState :show="!currentView" message="Wczytywanie panelu..." />
    <main v-if="currentView" class="main">
        <AppHeader />
        <component :is="currentView" />
    </main>
</template>

<style scoped>
.main {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.main > * {
    width: 100%;
    max-width: var(--content-max-width);
}
</style>
