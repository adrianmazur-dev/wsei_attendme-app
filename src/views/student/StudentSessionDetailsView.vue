<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useSessions, type CourseSessionItem } from '@/composables/useSessions'
import { useUserStore } from '@/stores/useUserStore'
import { formatDate, formatTimeRange } from '@/utils/date'
import AppLoadingState from '@/components/AppLoadingState.vue'
import ProgressBar from 'primevue/progressbar'
import { Tag } from 'primevue'
import Button from 'primevue/button'

const sessions = ref<CourseSessionItem[]>([])

const route = useRoute()
const userStore = useUserStore()
const { isLoading, getStudentSessions } = useSessions()

const sessionId = computed(() => Number(route.params.sessionId))
const courseGroupId = computed(() => Number(route.params.courseGroupId))

const currentSession = computed(() => {
    const session = sessions.value.find((s) => s.courseSessionId === sessionId.value) || null
    if (!session) return null

    const now = new Date()
    const past = sessions.value.filter((s) => s.dateStart && new Date(s.dateStart) < now)
    const attendedPast = past.filter((s) => s.isAttended)

    const frequency = past.length ? Math.round((attendedPast.length / past.length) * 100) : 0
    const progress = sessions.value.length
        ? Math.round((past.length / sessions.value.length) * 100)
        : 0

    return { ...session, frequency, progress }
})

onMounted(async () => {
    if (userStore.role) {
        sessions.value = await getStudentSessions(courseGroupId.value)
    }
})
</script>

<template>
    <main class="container">
        <AppLoadingState :show="isLoading" />

        <template v-if="currentSession">
            <div class="session-top">
                <Button icon="pi pi-arrow-left" @click="$router.back()" />
                <div class="title-group">
                    <h1>{{ currentSession.courseName }}</h1>
                </div>
            </div>

            <div class="info-card">
                <div class="info-grid">
                    <div class="info-item">
                        <i class="pi pi-calendar"></i>
                        <div class="info-text">
                            <label>Termin</label>
                            <span>{{ formatDate(currentSession.dateStart) }}</span>
                        </div>
                    </div>

                    <div class="info-item">
                        <i class="pi pi-clock"></i>
                        <div class="info-text">
                            <label>Godziny</label>
                            <span>{{
                                formatTimeRange(currentSession.dateStart, currentSession.dateEnd)
                            }}</span>
                        </div>
                    </div>

                    <div class="info-item">
                        <i class="pi pi-map-marker"></i>
                        <div class="info-text">
                            <label>Lokalizacja</label>
                            <span>{{ currentSession.locationName }}</span>
                        </div>
                    </div>

                    <div class="status-item">
                        <label>Obecność:</label>
                        <Tag
                            :severity="currentSession.isAttended ? 'success' : 'danger'"
                            :value="currentSession.isAttended ? 'OBECNY' : 'BRAK'"
                        />
                    </div>
                </div>
            </div>

            <div class="stats-grid">
                <div class="stat-box">
                    <div class="stat-header">
                        <span class="stat-label">Frekwencja dotychczasowa</span>
                        <span class="stat-value">{{ currentSession?.frequency }}%</span>
                    </div>
                    <ProgressBar :value="currentSession?.frequency || 0" :show-value="false" />
                </div>
                <div class="stat-box">
                    <div class="stat-header">
                        <span class="stat-label">Zaawansowanie kursu</span>
                        <span class="stat-value">{{ currentSession?.progress }}%</span>
                    </div>
                    <ProgressBar :value="currentSession?.progress || 0" :show-value="false" />
                </div>
            </div>
        </template>

        <div v-else-if="!isLoading" class="state-center">
            <p>Nie znaleziono sesji.</p>
        </div>
    </main>
</template>

<style scoped>
.session-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
    padding: 1rem;
}

:deep(.p-tag) {
    font-size: 1rem;
    padding: 0.5rem 2rem;
}

.title-group h1 {
    font-size: 1.75rem;
}

/* Info Card */
.info-card {
    border: 1px solid var(--p-surface-200);
    border-radius: 10px;
    padding: 2rem;
    margin-bottom: 1rem;
}

.info-grid {
    display: grid;
    grid-template-columns: 1fr auto;
    grid-template-rows: repeat(3, auto);
    gap: 1rem;
    align-items: center;
}

.info-item {
    display: flex;
    align-items: center;
    gap: 1rem;
}

.info-text {
    display: flex;
    flex-direction: column;
}

.info-text label {
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--p-text-muted-color);
}

.status-item {
    grid-column: 2;
    grid-row: 1 / span 3;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    padding-left: 2rem;
    border-left: 1px solid var(--p-surface-100);
}

.status-item label {
    font-size: 0.7rem;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--p-text-muted-color);
}

/* Stats */
.stats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
}

.stat-box {
    border: 1px solid var(--p-surface-200);
    padding: 2rem;
    border-radius: 10px;
}

.stat-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
}
</style>
