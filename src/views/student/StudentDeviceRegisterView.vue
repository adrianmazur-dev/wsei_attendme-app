<script setup lang="ts">
import { ref } from 'vue'
import { notify } from '@/utils/toast'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import router from '@/router'

import { useDeviceStore } from '@/stores/useDeviceStore'
import { InputNumber } from 'primevue'
import { useRoute } from 'vue-router'

const route = useRoute()
const deviceStore = useDeviceStore()

const registrationToken = ref<string | null>((route.params.token as string) || null)

const deviceName = ref<string>('')
const firstName = ref<string>('')
const lastName = ref<string>('')
const albumNumber = ref<number>()
const isLoading = ref(false)

const handleRegister = async () => {
    if (!deviceName.value || !firstName.value || !lastName.value || !albumNumber.value) {
        notify.error('Proszę wypełnić wszystkie pola', 'Błąd rejestracji')
        return
    }

    if (!registrationToken.value) {
        notify.error('Brak tokenu rejestracyjnego', 'Błąd rejestracji')
        return
    }

    isLoading.value = true
    try {
        await deviceStore.registerDevice(
            registrationToken.value,
            albumNumber.value,
            deviceName.value,
            firstName.value,
            lastName.value,
        )
        notify.success('Urządzenie zarejestrowane pomyślnie')
        router.push('/')
    } catch {
        notify.error(
            'Rejestracja nie powiodła się. Sprawdź token i spróbuj ponownie.',
            'Błąd rejestracji',
        )
    } finally {
        isLoading.value = false
    }
}
</script>

<template>
    <div v-if="deviceStore.isRegistered" class="state-center">
        <h2>Urządzenie zarejestrowane</h2>
        <p>Twoje urządzenie zostało pomyślnie zarejestrowane.</p>
        <Button label="Przejdź do dashboardu" @click="$router.push('/')" />
    </div>

    <div v-else-if="!registrationToken || registrationToken === ''" class="state-center">
        <h2>Błąd rejestracji</h2>
        <p>
            Token rejestracyjny nie został przekazany. Skontaktuj się z administratorem systemu lub
            wykładowcą w celu uzyskania prawidłowego linku rejestracyjnego.
        </p>
    </div>

    <div v-else class="reg-wrapper">
        <div class="reg-header">
            <div class="reg-logo">
                <img src="@/assets/images/logo.png" alt="AttendMe Logo" />
            </div>
            <h1>Rejestracja urządzenia</h1>
            <p>
                Rejestrujesz urządzenie, którego będziesz używać do sprawdzania obecności. Uzupełnij
                poniższe dane i naciśnij przycisk "Rejestruj".
            </p>
        </div>

        <div class="reg-card">
            <form class="reg-form" @submit.prevent="handleRegister">
                <div class="reg-field">
                    <label for="deviceName">Nazwa urządzenia</label>
                    <InputText
                        id="deviceName"
                        v-model="deviceName"
                        placeholder="Wprowadź nazwę urządzenia"
                    />
                </div>

                <div class="reg-field">
                    <label for="firstName">Twoje imię</label>
                    <InputText
                        id="firstName"
                        v-model="firstName"
                        placeholder="Wprowadź swoje imię"
                    />
                </div>

                <div class="reg-field">
                    <label for="lastName">Twoje nazwisko</label>
                    <InputText
                        id="lastName"
                        v-model="lastName"
                        placeholder="Wprowadź swoje nazwisko"
                    />
                </div>

                <div class="reg-field">
                    <label for="album">Twój numer albumu</label>
                    <InputNumber
                        id="album"
                        v-model="albumNumber"
                        placeholder="Wprowadź numer albumu"
                    />
                </div>

                <Button type="submit" label="Zarejestruj" :loading="isLoading" />
            </form>
        </div>
    </div>
</template>

<style scoped>
.reg-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 1.5rem;
}

.reg-header {
    text-align: center;
    max-width: 450px;
    margin-bottom: 2rem;
}

.reg-logo img {
    max-width: 120px;
}

.reg-card {
    padding: 2rem;
    width: 100%;
    max-width: 450px;
    border: 1px solid var(--p-surface-200);
}

.reg-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

.reg-field {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
}
</style>
