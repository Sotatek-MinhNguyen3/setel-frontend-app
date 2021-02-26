import { AxiosResponse } from "axios";
import { ApiErrorStatusCode } from "./constant";

export interface IRequestError {
    status: number;
    text: string;
  }
  
export const parseResult = (result: AxiosResponse): AxiosResponse["data"] =>
  result && result.data;

export const onError = ({ response }: any): IRequestError => {
  if(!response) return {
    status: 520,
    text: "It seems something went wrong. Please, try later.",
  }
    
  switch (response && response.status) {
    case ApiErrorStatusCode.BAD_REQUEST:
      return {
        status: response.status,
        text: "Incorrect request data",
      };
    case ApiErrorStatusCode.UNAUTHORIZED:
      return {
        status: response.status,
        text: "Authorisation error",
      };
    case ApiErrorStatusCode.NOT_FOUND:
      return {
        status: response.status,
        text: "User not found",
      };
    case response.status >= ApiErrorStatusCode.INTERNAL_STATUS_ERROR:
      return {
        status: response.status,
        text: "It seems something went wrong. Please, try later.",
      };
    default:
      return {
        status: response.status,
        text: response.statusText,
      };
  }
};