import { Request, Response, NextFunction } from "express";
export declare const UserOrder: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
