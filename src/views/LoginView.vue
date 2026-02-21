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
