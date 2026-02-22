<script setup lang="ts">
import Menu from 'primevue/menu'
import Avatar from 'primevue/avatar'
import Tag from 'primevue/tag'
import Button from 'primevue/button'
import { useUserMenu } from '@/composables/useUserMenu'
import type { UserRole } from '@/types/enums'

defineProps<{
    role: UserRole | null
}>()

const { menu, menuItems, userInitials, toggleMenu } = useUserMenu()
</script>

<template>
    <header class="header">
        <div class="header-left">
            <img src="@/assets/images/logo.png" alt="logo" />
        </div>
        <div class="header-right">
            <Button text @click="toggleMenu">
                <Avatar class="user-avatar" :label="userInitials" shape="circle" />
            </Button>
            <Menu ref="menu" :model="menuItems" popup>
                <template #start>
                    <div class="menu-user-info">
                        <Tag class="menu-user-role" :value="role" />
                    </div>
                </template>
            </Menu>
        </div>
    </header>
</template>

<style scoped>
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    background: var(--p-surface-0);

    border: 1px solid var(--p-surface-200);
    margin: 1rem;
}

.header-left,
.header-right {
    display: flex;
    align-items: center;
}

.header-left img {
    width: 64px;
}

.menu-user-info {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    border-bottom: 1px solid var(--p-surface-100);
}

.menu-user-role {
    margin-top: 0.25rem;
    text-transform: uppercase;
    letter-spacing: 0.05rem;
}

.user-avatar {
    width: 2.5rem;
    height: 2.5rem;
}
</style>
