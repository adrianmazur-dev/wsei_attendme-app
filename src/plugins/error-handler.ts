import { BaseError } from '@/types/errors/base-error';

export function setupGlobalErrors() {
    window.addEventListener('unhandledrejection', (event) => {
        if (event.reason instanceof BaseError) {
            event.reason.log('Unhandled rejection');
            event.reason.dispatchToast();
            event.preventDefault();
        }
    });
}