declare class AppError {
    readonly message: any;
    readonly statusCode: number;
    constructor(message: any, statusCode: number);
}
export default AppError;
