import { notify } from '@/utils/toast';

export abstract class BaseError extends Error {
    public details: Record<string, any>;
    public readonly timestamp: string;

    constructor(message: string, details?: any) {
        super(message);
        this.name = new.target.name;
        this.details = this.ensureObject(details);
        this.timestamp = new Date().toISOString();

        Object.setPrototypeOf(this, new.target.prototype);
    }

    public dispatchToast(): void {
        notify.error(this.message, this.name);
    }

    public log(context?: string): void {
        const errorLog = this.toObject(context);
        console.error(`[${errorLog.name}] ${errorLog.message}`, errorLog);
    }

    public toObject(context?: string) {
        return {
            name: this.name,
            message: this.message,
            context: context || 'Global',
            timestamp: this.timestamp,
            details: this.details,
            ...this.getExtraInfo()
        };
    }

    protected getExtraInfo(): Record<string, any> {
        return {};
    }

    private ensureObject(details: any): Record<string, any> {
        if (!details) return {};
        if (typeof details === 'object' && !Array.isArray(details)) return details;
        return { raw: details };
    }
}