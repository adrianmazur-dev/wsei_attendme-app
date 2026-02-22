import { ref, computed } from 'vue'

export const TIME_FILTER_OPTIONS = [
    { label: 'Wszystkie', value: 'all' },
    { label: 'Dziś', value: 'today' },
    { label: 'Jutro', value: 'tomorrow' },
    { label: 'Następny tydzień', value: 'next_week' },
    { label: 'Minione', value: 'past' },
]

export function getDateRange(filter: string): { dateStart?: string; dateEnd?: string } {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const d = (offset: number) => {
        const dt = new Date(today)
        dt.setDate(dt.getDate() + offset)
        return dt.toISOString()
    }
    if (filter === 'today') return { dateStart: d(0), dateEnd: d(1) }
    if (filter === 'tomorrow') return { dateStart: d(1), dateEnd: d(2) }
    if (filter === 'next_week') return { dateStart: d(0), dateEnd: d(7) }
    if (filter === 'past') return { dateEnd: d(0) }
    return {}
}

export function useSessionFilters() {
    const selectedTimeFilter = ref('all')
    const searchText = ref('')

    const dateRange = computed(() => getDateRange(selectedTimeFilter.value))

    return { selectedTimeFilter, searchText, dateRange }
}
