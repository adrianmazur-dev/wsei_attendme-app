<script setup lang="ts">
import { onMounted } from 'vue'
import Tag from 'primevue/tag'
import { formatDate, formatDayTimeRange } from '@/utils/date'
import { useSessions } from '@/composables/useSessions'
import AppLoadingState from '@/components/AppLoadingState.vue'
import { useUserStore } from '@/stores/useUserStore'

const userStore = useUserStore()
const { sessions, isLoading, fetchSessions, openSession } = useSessions()

onMounted(() => {
    if (userStore.role) fetchSessions(userStore.role)
})
</script>

<template>
    <main class="container">
        <AppLoadingState :show="isLoading" message="Pobieranie listy zajęć..." />

        <div v-if="!sessions.length" class="state-center">
            <p>There are no sessions to display.</p>
        </div>

        <ul v-else class="sessions-list">
            <li
                class="session-item"
                v-for="s in sessions"
                :key="s.courseSessionId"
                @click="openSession(s)"
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
    </main>
</template>
