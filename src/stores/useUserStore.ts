import { defineStore } from 'pinia';
import { attendmeClient } from '@/api';
import { ref, computed } from 'vue';
import { type AttendmeSchemas } from '@/api';
import { ApiError } from '@/types/errors';
import { UserRole } from '@/types/enums';

type User = AttendmeSchemas['User'];

export const useUserStore = defineStore('user', () => {
    const userData = ref<User | null>(null);

    const user = computed(() => userData.value);
    const role = computed<UserRole | null>(() => {
        if (!userData.value) return null;
        if (userData.value.isStudent) return UserRole.Student;
        if (userData.value.isTeacher) return UserRole.Lecturer;
        return null;
    });

    async function fetchUserData(): Promise<void> {
        const { data } = await attendmeClient.send(
            attendmeClient.GET('/user/get', { params: { query: {} } })
        );
        userData.value = data;
    };

    function clearUserData(): void {
        userData.value = null;
    }

    return {
        user,
        role,
        fetchUserData,
        clearUserData,
    };
});