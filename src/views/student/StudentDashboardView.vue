<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Tag from 'primevue/tag'
import { formatDate, formatDayTimeRange } from '@/utils/date'
import { useSessions } from '@/composables/useSessions'
import { useSessionFilters, getDateRange } from '@/composables/useSessionFilters'
import AppLoadingState from '@/components/AppLoadingState.vue'
import { useUserStore } from '@/stores/useUserStore'
import type { AttendmeSchemas } from '@/backend'

import SessionFiltersPanel from '@/components/SessionFiltersPanel.vue'

const userStore = useUserStore()
const { selectedTimeFilter, searchText } = useSessionFilters()
const { isLoading, getFilteredSessions, openStudentSession } = useSessions()
const sessions = ref<AttendmeSchemas['CourseSessionListItem'][]>([])

async function fetchSessions() {
    if (userStore.role) {
        sessions.value = await getFilteredSessions(userStore.role, {
            pageNumber: 1,
            pageSize: 100,
            filters: {
                search: searchText.value || undefined,
                ...getDateRange(selectedTimeFilter.value),
            },
        })
    }
}

onMounted(async () => {
    await fetchSessions()
})
</script>

<template>
    <main class="container">
        <SessionFiltersPanel
            v-model:time-filter="selectedTimeFilter"
            v-model:search="searchText"
            @change="fetchSessions"
        />

        <AppLoadingState :show="isLoading" message="Pobieranie listy zajęć..." />

        <div v-if="!sessions.length" class="state-center">
            <p>Nie ma żadnych sesji do wyświetlenia.</p>
        </div>

        <div v-else>
            <ul class="sessions-list">
                <li
                    class="session-item"
                    v-for="s in sessions"
                    :key="s.courseSessionId"
                    @click="openStudentSession(s)"
                >
                    <div class="session-item__left">
                        <Tag
                            :value="formatDayTimeRange(s.dateStart, s.dateEnd)"
                            class="session-meta-tag"
                        />
                        <span class="session-name">{{ s.courseName }}</span>
                        <span class="session-date">{{ formatDate(s.dateStart) }}</span>
                    </div>
                    <div class="session-item__right">
                        <span class="session-location">{{ s.locationName }}</span>
                    </div>
                </li>
            </ul>
        </div>
    </main>
</template>
