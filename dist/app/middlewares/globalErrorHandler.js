"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const handleValidationErrors_1 = __importDefault(require("../../errors/handleValidationErrors"));
const apiError_1 = __importDefault(require("../../errors/apiError"));
const handleCastError_1 = __importDefault(require("../../errors/handleCastError"));
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = 500;
    let message = "something went wrong";
    let errorMessage = [];
    if ((err === null || err === void 0 ? void 0 : err.name) === "ValidationError") {
        const thowValidationError = (0, handleValidationErrors_1.default)(err);
        message = thowValidationError.message;
        errorMessage = thowValidationError.errorMessages;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === "CastError") {
        const thowCastError = (0, handleCastError_1.default)(err);
        message = thowCastError.message;
        errorMessage = thowCastError.errorMessages;
    }
    else if (err instanceof apiError_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err.message;
        errorMessage = (err === null || err === void 0 ? void 0 : err.message)
            ? [
                {
                    path: '',
                    message: err === null || err === void 0 ? void 0 : err.message,
                },
            ]
            : [];
    }
    else if (err instanceof Error) {
        message = err === null || err === void 0 ? void 0 : err.message;
        errorMessage = (err === null || err === void 0 ? void 0 : err.message)
            ? [
                {
                    path: '',
                    message: err === null || err === void 0 ? void 0 : err.message,
                },
            ]
            : [];
    }
    res.status(statusCode).json({
        success: false,
        message,
        errorMessage,
        stack: config_1.default.env !== 'production' ? err === null || err === void 0 ? void 0 : err.stack : undefined
    });
    next();
};
exports.default = globalErrorHandler;
