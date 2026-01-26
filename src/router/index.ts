import { useAuthStore } from '@/stores/useAuthStore';
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/shared/LoginView.vue')
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('@/views/student/StudentDashboardView.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router;