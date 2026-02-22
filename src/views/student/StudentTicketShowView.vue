<script setup lang="ts">
import { useTickets } from '@/composables/useTickets'
import { onMounted } from 'vue'
import Button from 'primevue/button'

const { isLoading, token, error, fetchTicket } = useTickets()
onMounted(async () => {
    await fetchTicket()
})
</script>

<template>
    <main class="container">
        <template v-if="token">
            <div class="state-center">
                <img class="logo" src="@/assets/images/logo.png" alt="" />
                <h1>Twój kod QR</h1>
                <p>Aby zarejestorwać obecność umieść telefon w polu widzenia skanera.</p>

                <div class="qr-code">
                    <img
                        :src="`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${token}`"
                        alt="QR Code"
                    />
                </div>

                <p>W razie wątpliwości poproś osobę prowadzącą zajęcia o pomoc.</p>
            </div>
        </template>

        <div v-else-if="error" class="state-center">
            <p>{{ error }}</p>
            <Button label="Spróbuj ponownie" @click="fetchTicket()" />
        </div>

        <div v-else-if="!isLoading" class="state-center">
            <p>Nie udało się wygenerować kodu QR.</p>
        </div>
    </main>
</template>

<style scoped>
.logo {
    max-width: 150px;
}
</style>
