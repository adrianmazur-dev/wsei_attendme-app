<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { notify } from '@/utils/toast'

import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import router from '@/router'

const authStore = useAuthStore()
const loginName = ref('')
const password = ref('')

const handleLogin = async () => {
    if (!loginName.value || !password.value) {
        notify.error('Please enter both username and password', 'Login Failed')
        return
    }

    await authStore.userLogin(loginName.value, password.value)
    notify.success('Logged in successfully')
    router.push('dashboard')
}
</script>

<template>
    <div class="login-container">
        <div class="login-card">
            <div class="logo">
                <img src="@/assets/logo-dark.png" alt="" />
            </div>

            <form @submit.prevent="handleLogin">
                <div class="field">
                    <label for="username">Username</label>
                    <InputText
                        id="username"
                        v-model="loginName"
                        placeholder="Enter your username"
                        class="w-full"
                    />
                </div>

                <div class="field">
                    <label for="password">Password</label>
                    <Password
                        id="password"
                        v-model="password"
                        :feedback="false"
                        toggleMask
                        class="w-full"
                        placeholder="Enter your password"
                    />
                </div>

                <Button type="submit" label="Login" class="w-full login-btn" />
            </form>
        </div>
    </div>
</template>

<style scoped>
.login-container {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #1a1a1a;
}

.login-card {
    background: #2d2d2d;
    padding: 2.5rem;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
    width: 100%;
    max-width: 380px;
}

.field {
    margin-bottom: 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.field label {
    font-size: 0.9rem;
    font-weight: 500;
}

.w-full {
    width: 100% !important;
}

:deep(.p-password input) {
    width: 100%;
}

.logo {
    text-align: center;
    margin-bottom: 2.5rem;
}

.logo img {
    max-width: 220px;
    height: auto;
}
</style>
