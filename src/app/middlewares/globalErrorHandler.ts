import { ErrorRequestHandler } from "express";
import { IGenericErrMsg } from "../../errors/errorInterface";
import config from "../../config";
import handleValidationError from "../../errors/handleValidationErrors";
import ApiError from "../../errors/apiError";
import handleCastError from "../../errors/handleCastError";

const globalErrorHandler:ErrorRequestHandler = (err, req, res, next) => {


    let statusCode = 500;
    let message = "something went wrong"
    let errorMessage: IGenericErrMsg[] = []

    if (err?.name === "ValidationError") {
        const thowValidationError = handleValidationError(err)
        message = thowValidationError.message;
        errorMessage = thowValidationError.errorMessages;
    } else if (err?.name === "CastError") {
      const thowCastError = handleCastError(err)
        message = thowCastError.message;
        errorMessage = thowCastError.errorMessages;
    }else if (err instanceof ApiError) {
        statusCode = err?.statusCode;
        message = err.message;
        errorMessage = err?.message
          ? [
              {
                path: '',
                message: err?.message,
              },
            ]
          : [];
      } else if (err instanceof Error) {
        message = err?.message;
        errorMessage = err?.message
          ? [
              {
                path: '',
                message: err?.message,
              },
            ]
          : [];
      }
    
    
    res.status(statusCode).json({
        success: false,
        message,
        errorMessage,
        stack:config.env!=='production'? err?.stack : undefined
    })
    next()
    
}

export default globalErrorHandler;