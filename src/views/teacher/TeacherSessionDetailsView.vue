<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useSessions } from '@/composables/useSessions'
import { useUserStore } from '@/stores/useUserStore'
import { formatDate, formatTimeRange } from '@/utils/date'
import AppLoadingState from '@/components/AppLoadingState.vue'
import { Tag } from 'primevue'
import Button from 'primevue/button'
import { type TeacherSessionItem } from '@/types/sessions'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import type { AttendmeSchemas } from '@/backend'

const route = useRoute()
const userStore = useUserStore()
const { isLoading, getTeacherSession } = useSessions()

const sessionId = computed(() => Number(route.params.sessionId))

const currentSession = ref<TeacherSessionItem | null>(null)

async function toggleAttendance(record: AttendmeSchemas['CourseSessionAttendanceRecord']) {
    if (!currentSession.value) return

    try {
        await useSessions().toggleSessionAttendance(
            record.attenderUserId!,
            record.courseSessionId!,
            !record.wasUserPresent,
        )

        currentSession.value = await getTeacherSession(sessionId.value)
    } catch (error) {
        console.error('Nie można zmienić statusu obecności:', error)
    }
}

onMounted(async () => {
    if (userStore.role) {
        currentSession.value = await getTeacherSession(sessionId.value)
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
                </div>
            </div>

            <div class="info-card">
                <DataTable :value="currentSession.attendanceList" :rows="10" paginator>
                    <template #empty><div class="state-center">Brak studentów.</div></template>

                    <Column field="userSurname" header="Uczestnik">
                        <template #body="slotProps">
                            {{ slotProps.data.userSurname }} {{ slotProps.data.userName }}
                        </template>
                    </Column>

                    <Column field="studentAlbumIdNumber" header="Nr albumu"></Column>

                    <Column header="Obecność">
                        <template #body="slotProps">
                            <Tag
                                :class="[
                                    'attendance-status',
                                    slotProps.data.wasUserPresent
                                        ? 'attendance-status__present'
                                        : 'attendance-status__absent',
                                ]"
                                :value="slotProps.data.wasUserPresent ? 'Obecny' : 'Brak'"
                            />
                        </template>
                    </Column>

                    <Column header="Akcja">
                        <template #body="slotProps">
                            <Button
                                :label="slotProps.data.wasUserPresent ? 'Odznacz' : 'Zaznacz'"
                                :class="[
                                    slotProps.data.wasUserPresent
                                        ? 'p-button-secondary'
                                        : 'p-button-dark',
                                ]"
                                @click="toggleAttendance(slotProps.data)"
                            />
                        </template>
                    </Column>
                </DataTable>
            </div>
        </template>

        <div v-else-if="!isLoading" class="state-center">
            <p>Nie znaleziono sesji.</p>
        </div>
    </main>
</template>

<style scoped>
:deep .p-button {
    padding: 0.25rem;
}
</style>
