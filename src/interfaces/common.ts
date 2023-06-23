import { IGenericErrMsg } from "../errors/errorInterface";

export type IGenericResponse<T> = {
    meta: {
      page: number;
      limit: number;
      total: number;
    };
    dataSize:number
    data: T;
};
  
export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessages: IGenericErrMsg[];
};