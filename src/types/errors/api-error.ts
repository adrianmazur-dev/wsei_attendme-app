import { BaseError } from "./base-error";

export class ApiError extends BaseError {
    constructor(
        public status: number | null,
        message: string,
        details?: any
    ) {
        super(message || 'API error occurred', details);
    }

    protected override getExtraInfo(): Record<string, any> {
        return { status: this.status };
    }
}