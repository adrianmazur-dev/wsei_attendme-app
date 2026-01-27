import type { Middleware } from 'openapi-fetch'
import { ApiError } from '@/types/errors'

export const loggingMiddleware: Middleware = {
    async onRequest({ request }) {
        console.log(`[API] ${request.method} ${request.url}`)
        return request
    },
    async onResponse({ response }) {
        console.log(`[API] ${response.status} ${response.url}`)
        return response
    },
    async onError({ error }) {
        console.error('[API] Network error:', error)
    },
}

export const errorMiddleware: Middleware = {
    async onResponse({ response }) {
        if (!response.ok) {
            throw new ApiError(response.status, `API request failed`, response)
        }
    },

    async onError({ error }) {
        return new ApiError(null, `Fetch error occurred`, error)
    },
}

export const baseUrlMiddleware = (getBaseUrl: () => string): Middleware => ({
    onRequest: ({ request }) => {
        const currentBaseUrl = getBaseUrl()

        const requestUrl = new URL(request.url)
        const baseUrl = new URL(currentBaseUrl)
        const finalUrl = `${baseUrl.origin.replace(/\/$/, '')}${requestUrl.pathname}${requestUrl.search}`

        return new Request(finalUrl, request)
    },
})

export const jwtMiddleware = (getToken: () => string | null): Middleware => ({
    onRequest: ({ request }) => {
        const token = getToken()
        if (token) {
            request.headers.set('Authorization', `Bearer ${token}`)
        }
        return request
    },
})
