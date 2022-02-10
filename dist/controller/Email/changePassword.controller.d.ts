import { NextFunction, Response, Request } from "express-serve-static-core";
export declare const changePassword: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>, number> | undefined>;
