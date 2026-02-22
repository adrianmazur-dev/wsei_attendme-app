import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/useUserStore'
import { useAuthStore } from '@/stores/useAuthStore'
import { notify } from '@/utils/toast'

export function useUserMenu() {
    const router = useRouter()
    const userStore = useUserStore()
    const authStore = useAuthStore()

    const menu = ref<{ toggle: (e: Event) => void } | null>(null)

    const menuItems = computed(() => [
        {
            label: userName.value,
            items: [
                {
                    label: 'Wyloguj się',
                    command: () => {
                        authStore.logout()
                        userStore.clearUserData()
                        notify.success('Wylogowano pomyślnie')
                        router.push('/login')
                    },
                },
            ],
        },
    ])

    const userInitials = computed(() => {
        const u = userStore.user
        if (!u) return '?'
        const n = (u.name?.[0] ?? '') + (u.surname?.[0] ?? '')
        return n.toUpperCase() || u.loginName?.[0]?.toUpperCase() || '?'
    })

    const userName = computed(() => {
        const u = userStore.user
        if (!u) return ''
        return [u.name, u.surname].filter(Boolean).join(' ') || u.loginName || ''
    })

    function toggleMenu(event: Event) {
        menu.value?.toggle(event)
    }

    return { menu, menuItems, userInitials, userName, toggleMenu }
}
