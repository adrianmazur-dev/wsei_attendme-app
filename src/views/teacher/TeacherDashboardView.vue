<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Tag from 'primevue/tag'
import { formatDate, formatDayTimeRange } from '@/utils/date'
import { useSessions } from '@/composables/useSessions'
import AppLoadingState from '@/components/AppLoadingState.vue'
import { useUserStore } from '@/stores/useUserStore'
import type { AttendmeSchemas } from '@/backend'

const userStore = useUserStore()
const { isLoading, getFilteredSessions } = useSessions()
const sessions = ref<AttendmeSchemas['CourseSessionListItem'][]>([])

onMounted(async () => {
    if (userStore.role) {
        sessions.value = await getFilteredSessions(userStore.role, {
            pageNumber: 1,
            pageSize: 100,
        })
    }
})
</script>

<template>
    <main class="container">
        <AppLoadingState :show="isLoading" message="Pobieranie listy zajęć..." />

        <div v-if="!sessions.length" class="state-center">
            <p>Nie ma żadnych sesji do wyświetlenia.</p>
        </div>

        <ul v-else class="sessions-list">
            <li v-for="s in sessions" :key="s.courseSessionId" class="session-item">
                <div class="session-item__left">
                    <Tag
                        :value="formatDayTimeRange(s.dateStart, s.dateEnd)"
                        class="session-meta-tag"
                    />
                    <span class="session-name">{{ s.courseName }}</span>
                    <span class="session-date">{{ formatDate(s.dateStart) }}</span>
                </div>
                <div class="session-item__right">
                    <span class="session-group">{{ s.courseGroupName }}</span>
                    <span class="session-location">{{ s.locationName }}</span>
                </div>
            </li>
        </ul>
    </main>
</template>
