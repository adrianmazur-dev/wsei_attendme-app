<script setup lang="ts">
import { onMounted } from 'vue'
import Tag from 'primevue/tag'
import { formatDate, formatDayTimeRange } from '@/utils/date'
import { useSessions } from '@/composables/useSessions'
import AppLoadingState from '@/components/AppLoadingState.vue'
import { useUserStore } from '@/stores/useUserStore'

const { sessions, isLoading, fetchSessions } = useSessions()
const { role } = useUserStore()

if (role) onMounted(() => fetchSessions(role))
</script>

<template>
    <main>
        <AppLoadingState :show="isLoading" message="Pobieranie listy zajęć..." />

        <div v-if="!sessions.length" class="state-center">
            <p>Brak zajęć do wyświetlenia.</p>
        </div>

        <ul v-else class="sessions-list">
            <li v-for="s in sessions" :key="s.courseSessionId" class="session-item">
                <div class="session-item__left">
                    <Tag
                        :value="formatDayTimeRange(s.dateStart, s.dateEnd)"
                        severity="secondary"
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

<style scoped>
.sessions-list {
    list-style: none;
    margin: 0;
    padding: 0;
    border: 1px solid var(--p-surface-200);
    border-radius: 10px;
    overflow: hidden;
}

.session-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.25rem;
    background: var(--p-surface-0);
    border-bottom: 1px solid var(--p-surface-100);
    cursor: pointer;
    transition: background 0.15s;
}

.session-item:hover,
.session-item:focus {
    background: var(--p-surface-50);
}

.session-item__left,
.session-item__right {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.session-name {
    font-size: 1rem;
    font-weight: 600;
    color: var(--p-text-color);
}

.session-meta-tag {
    font-size: 0.7rem;
    align-self: flex-start;
}

.session-date,
.session-location {
    font-size: 0.8rem;
    color: var(--p-text-muted-color);
}
</style>
