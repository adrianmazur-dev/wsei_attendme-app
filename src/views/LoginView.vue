<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { notify } from '@/utils/toast'
import { ApiError } from '@/types/errors'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import router from '@/router'

const authStore = useAuthStore()
const loginName = ref('')
const password = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
    if (!loginName.value || !password.value) {
        notify.error('Proszę wypełnić wszystkie pola', 'Błąd logowania')
        return
    }

    isLoading.value = true
    try {
        await authStore.userLogin(loginName.value, password.value)
        notify.success('Zalogowano pomyślnie')
        router.push('dashboard')
    } catch (e) {
        if (e instanceof ApiError) e.dispatchToast()
    } finally {
        isLoading.value = false
    }
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
                    <label for="username">Nazwa użytkownika</label>
                    <InputText
                        id="username"
                        v-model="loginName"
                        class="w-full"
                        placeholder="Wprowadź nazwę użytkownika"
                    />
                </div>

                <div class="login-field">
                    <label for="password">Hasło</label>
                    <Password
                        id="password"
                        v-model="password"
                        :feedback="false"
                        toggleMask
                        class="w-full"
                        placeholder="Wprowadź hasło"
                    />
                </div>

                <Button
                    type="submit"
                    label="Login"
                    class="w-full login-submit"
                    :loading="isLoading"
                />
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
