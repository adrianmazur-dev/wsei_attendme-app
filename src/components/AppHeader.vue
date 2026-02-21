<script setup lang="ts">
import Avatar from 'primevue/avatar'
</script>

<template>
    <header class="header">
        <div class="header-left">
            <img src="@/assets/images/logo-light.png" alt="logo" />
        </div>
        <div class="header-right">
            <Avatar shape="circle" />
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
    max-width: 64px;
}
</style>
