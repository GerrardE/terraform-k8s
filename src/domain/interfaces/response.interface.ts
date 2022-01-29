import { Response, Request } from "express";

export interface IResponse {
    statusCode: number;
    headers: Request;
    body: Response;
}
