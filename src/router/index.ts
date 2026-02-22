import { useAuthStore } from '@/stores/useAuthStore'
import { useUserStore } from '@/stores/useUserStore'
import { createRouter, createWebHistory } from 'vue-router'
import { ApiError } from '@/types/errors'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/login',
            component: () => import('@/views/LoginView.vue'),
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
            component: () => import('@/views/DashboardView.vue'),
            meta: { requiresAuth: true },
        },
        {
            path: '/student/session/:courseGroupId/:sessionId',
            name: 'student-session-details',
            component: () => import('@/views/student/StudentSessionDetailsView.vue'),
            meta: { requiresAuth: true },
        },
        {
            path: '/student/ticket/show',
            name: 'student-ticket-show',
            component: () => import('@/views/student/StudentTicketShowView.vue'),
            meta: { requiresAuth: true },
        },
        {
            path: '/student/device/register/:token?',
            name: 'student-device-register',
            component: () => import('@/views/student/StudentDeviceRegisterView.vue'),
            meta: {},
        },
        {
            path: '/teacher/session/:courseGroupId/:sessionId',
            name: 'teacher-session-details',
            component: () => import('@/views/teacher/TeacherSessionDetailsView.vue'),
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
        }

        try {
            await userStore.fetchUserData()
        } catch (e) {
            if (e instanceof ApiError) {
                authStore.logout()
                userStore.clearUserData()
                return '/login'
            }
        }
    }

    return true
})

export default router
