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
    <div class="login-wrapper">
        <div class="login-card">
            <div class="login-logo">
                <img src="@/assets/images/logo.png" alt="Logo" />
            </div>

            <form class="login-form" @submit.prevent="handleLogin">
                <div class="login-field">
                    <label for="username">Username</label>
                    <InputText
                        id="username"
                        v-model="loginName"
                        class="w-full"
                        placeholder="Enter your username"
                    />
                </div>

                <div class="login-field">
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

                <Button type="submit" label="Login" class="w-full login-submit" />
            </form>
        </div>
    </div>
</template>

<style scoped>
.login-wrapper {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
}

.login-card {
    padding: 2.5rem;
    border-radius: 1rem;
    width: 100%;
    max-width: 400px;
    background-color: var(--p-surface-50);
    border: 1px solid var(--p-surface-border);
    box-shadow: var(--p-focus-ring);
}

.login-logo {
    text-align: center;
    margin-bottom: 2rem;
}

.login-logo img {
    max-width: 200px;
    height: auto;
}

.login-form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
}

.login-field {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.login-field label {
    font-size: 1rem;
    font-weight: 500;
}

.login-submit {
    margin-top: 0.5rem;
}
</style>
