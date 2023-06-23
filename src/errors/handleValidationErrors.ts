import mongoose from "mongoose";
import { IGenericErrMsg } from "./errorInterface";
import { IGenericErrorResponse } from "../interfaces/common";



const handleValidationError = (
    thorwError: mongoose.Error.ValidationError
  ): IGenericErrorResponse => {
    const ValidationError: IGenericErrMsg[] = Object.values(thorwError.errors).map(
      (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
        return {
          path: el?.path,
          message: el?.message,
        };
      }
    );
    const statusCode = 400;
    return {
      statusCode,
      message: 'Validation Error',
      errorMessages: ValidationError,
    };
  };


 export default handleValidationError;