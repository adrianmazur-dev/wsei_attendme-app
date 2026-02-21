import { useAuthStore } from '@/stores/useAuthStore'
import { useUserStore } from '@/stores/useUserStore'
import { createRouter, createWebHistory } from 'vue-router'

const LoginView = () => import('@/views/LoginView.vue')
const DashboardView = () => import('@/views/DashboardView.vue')
const StudentSessionDetailsView = () => import('@/views/student/StudentSessionDetailsView.vue')

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            component: LoginView,
            meta: {},
            beforeEnter: () => {
                const authStore = useAuthStore()
                if (authStore.isAuthenticated) {
                    return '/'
                }
                return true
            },
        },
        {
            path: '/',
            redirect: '/dashboard',
        },
        {
            path: '/dashboard',
            component: DashboardView,
            meta: { requiresAuth: true },
        },
        {
            path: '/student/session/:courseGroupId/:sessionId',
            name: 'student-session-details',
            component: StudentSessionDetailsView,
            meta: { requiresAuth: true },
        },
    ],
})

router.beforeEach(async (to) => {
    if (to.meta.requiresAuth) {
        const authStore = useAuthStore()
        const userStore = useUserStore()

        if (!authStore.isAuthenticated) {
            authStore.logout()
            userStore.clearUserData()
            return '/login'
        } else {
            const userStore = useUserStore()
            await userStore.fetchUserData()
        }
    }

    return true
})

export default router
