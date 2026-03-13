class AppError extends Error {
    constructor(statusCode, message, errors = []) {
        super(message);
        this.statusCode = statusCode;
        if(errors.length > 0) {
            this.errors = errors;
        }
    }
}
export default AppError;