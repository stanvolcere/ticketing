import { CustomError } from './custom-error';

export class NotAuthorizedError extends CustomError {
    statusCode = 401;

    constructor() {
        super("Not authorized.");

        // Only because we are extending a built in class
        Object.setPrototypeOf(this, NotAuthorizedError.prototype);
    }

    serializeErrors(): { message: string; field?: string | undefined; }[] {
        return [{ message: "Not authorized." }]
    }
}