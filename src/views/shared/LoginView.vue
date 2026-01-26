
<script setup lang="ts">
import { useAuthStore } from '@/stores/useAuthStore'

const authStore = useAuthStore()

authStore.userLogin('stu15396', 'sad')
</script>

<template>
  <h1>Login</h1>
</template>
