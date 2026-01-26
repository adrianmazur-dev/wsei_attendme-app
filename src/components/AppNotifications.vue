<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue';
import { useToast } from "primevue/usetoast";
import Toast from 'primevue/toast';

const toast = useToast();

const handleToastEvent = (event: Event) => {
    const customEvent = event as CustomEvent;
    if (customEvent.detail) {
        toast.add(customEvent.detail);
    }
};

onMounted(() => {
    window.addEventListener('app-toast', handleToastEvent);
});

onUnmounted(() => {
    window.removeEventListener('app-toast', handleToastEvent);
});
</script>

<template>
    <Toast position="bottom-right" />
</template>