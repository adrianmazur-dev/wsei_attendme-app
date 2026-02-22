<script setup lang="ts">
import Select from 'primevue/select'
import InputText from 'primevue/inputtext'
import IconField from 'primevue/iconfield'
import { TIME_FILTER_OPTIONS } from '@/composables/useSessionFilters'

const timeFilter = defineModel<string>('timeFilter', { default: 'all' })
const search = defineModel<string>('search', { default: '' })

const emit = defineEmits<{ (e: 'change'): void }>()
</script>

<template>
    <section class="filters-panel">
        <div class="filters-row">
            <Select
                v-model="timeFilter"
                :options="TIME_FILTER_OPTIONS"
                option-label="label"
                option-value="value"
                class="filter-select"
                @change="emit('change')"
            />
            <IconField class="filter-search">
                <InputText
                    v-model="search"
                    placeholder="Przedmiot, lokalizacja..."
                    @change="emit('change')"
                />
            </IconField>
        </div>
    </section>
</template>

<style scoped>
.filters-panel {
    margin-bottom: 1rem;
}

.filters-row {
    display: flex;
    gap: 0.75rem;
    align-items: center;
}
</style>
