<script setup lang="ts">
import ProgressSpinner from 'primevue/progressspinner'

defineProps<{
    show: boolean
    message?: string
}>()
</script>

<template>
    <div v-if="show" class="loading-main">
        <div class="loading-content">
            <ProgressSpinner />
            <p v-if="message" class="loading-text">{{ message }}</p>
        </div>
    </div>
</template>

<style scoped>
.loading-main {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;

    background-color: rgba(255, 255, 255, 0.7);
    backdrop-filter: blur(4px);

    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
}

.loading-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.loading-text {
    color: var(--p-primary-color);
}
</style>
