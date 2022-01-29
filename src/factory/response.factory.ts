import { IResponse } from "../domain/interfaces/response.interface";

export const createResponse = ({
  statusCode = 200,
  headers,
  body,
}): IResponse => {
  return {
    statusCode,
    headers,
    body,
  };
};
