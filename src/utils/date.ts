export function formatDate(dateStr?: string): string {
    if (!dateStr) return '–'
    return new Date(dateStr).toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    })
}

export function formatTime(dateStr?: string): string {
    if (!dateStr) return '–'
    return new Date(dateStr).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
}

export function formatTimeRange(start?: string, end?: string): string {
    return `${formatTime(start)} – ${formatTime(end)}`
}

export function formatDayTimeRange(start?: string, end?: string): string {
    if (!start || !end) return ''
    const day = new Date(start).toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase()
    return `${day} ${formatTimeRange(start, end)}`
}
