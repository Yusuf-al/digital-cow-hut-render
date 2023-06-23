"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError = (thorwError) => {
    const ValidationError = Object.values(thorwError.errors).map((el) => {
        return {
            path: el === null || el === void 0 ? void 0 : el.path,
            message: el === null || el === void 0 ? void 0 : el.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation Error',
        errorMessages: ValidationError,
    };
};
exports.default = handleValidationError;
