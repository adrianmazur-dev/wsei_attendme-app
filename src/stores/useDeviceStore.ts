import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { attendmeDeviceClient } from '@/backend'

export const useDeviceStore = defineStore(
    'device',
    () => {
        const token = ref<string | null>(null)
        const expires = ref<number | null>(null)

        const isRegistered = computed(() => {
            if (!token.value || !expires.value) return false
            const s = Date.now() < expires.value
            console.log('Device registration status:', s, {
                token: token.value,
                expires: expires.value,
            })
            return s
        })

        async function registerDevice(
            registrationToken: string, // jwt token
            albumIdNumber: number,
            deviceName: string,
            firstName: string,
            lastName: string,
        ): Promise<void> {
            const { data } = await attendmeDeviceClient.send(
                attendmeDeviceClient.POST('/user/device/register', {
                    headers: { Authorization: `Bearer ${registrationToken}` },
                    body: {
                        albumIdNumber: albumIdNumber,
                        deviceName: deviceName,
                        studentName: firstName,
                        studentSurname: lastName,
                    },
                }),
            )

            token.value = data.token || null
            if (data.expires) {
                expires.value = new Date(data.expires).getTime()
            }
        }

        return {
            token,
            expires,
            isRegistered,
            registerDevice,
        }
    },
    {
        persist: true,
    },
)
