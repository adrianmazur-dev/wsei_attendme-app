export const notify = {
    success: (msg: string, title = 'Success') => {
        window.dispatchEvent(new CustomEvent('app-toast', {
            detail: { severity: 'success', summary: title, detail: msg, life: 3000 }
        }));
    },
    info: (msg: string, title = 'Information') => {
        window.dispatchEvent(new CustomEvent('app-toast', {
            detail: { severity: 'info', summary: title, detail: msg, life: 3000 }
        }));
    },
    warn: (msg: string, title = 'Warning') => {
        window.dispatchEvent(new CustomEvent('app-toast', {
            detail: { severity: 'warn', summary: title, detail: msg, life: 5000 }
        }));
    },
    error: (msg: string, title = 'Error') => {
        window.dispatchEvent(new CustomEvent('app-toast', {
            detail: { severity: 'error', summary: title, detail: msg, life: 5000 }
        }));
    }
};