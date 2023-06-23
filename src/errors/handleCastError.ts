import mongoose from 'mongoose';
import { IGenericErrMsg } from './errorInterface';

const handleCastError = (error: mongoose.Error.CastError) => {
  const castErr: IGenericErrMsg[] = [
    {
      path: error.path,
      message: 'ID is invalid...Plz Put a correct ID',
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: 'Cast Error',
    errorMessages:  castErr,
  };
};

export default handleCastError;