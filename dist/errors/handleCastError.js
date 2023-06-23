"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (error) => {
    const castErr = [
        {
            path: error.path,
            message: 'ID is invalid...Plz Put a correct ID',
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: 'Cast Error',
        errorMessages: castErr,
    };
};
exports.default = handleCastError;
