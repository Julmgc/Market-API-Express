import { NextFunction, Response, Request } from "express";
export declare const deleteCartProduct: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
