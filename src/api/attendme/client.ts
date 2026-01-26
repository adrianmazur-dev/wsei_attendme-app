import { ClientBase } from '@/api/shared/client-base'
import type { paths } from './schema'
import { useConfigStore } from '@/stores/useConfigStore'

export const attendmeClient = new ClientBase<paths>({
    getBaseUrl: () => useConfigStore().settings.backendBaseUrl,
})

