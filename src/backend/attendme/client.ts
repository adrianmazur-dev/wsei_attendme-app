import { ClientBase } from '@/backend/shared/client-base'
import type { paths } from './schema'
import { useConfigStore } from '@/stores/useConfigStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { useDeviceStore } from '@/stores/useDeviceStore'

export const attendmeClient = new ClientBase<paths>({
    getBaseUrl: () => useConfigStore().settings.backendBaseUrl,
    getToken: () => useAuthStore().token,
})

export const attendmeDeviceClient = new ClientBase<paths>({
    getBaseUrl: () => useConfigStore().settings.backendBaseUrl,
    getToken: () => useDeviceStore().token,
})
