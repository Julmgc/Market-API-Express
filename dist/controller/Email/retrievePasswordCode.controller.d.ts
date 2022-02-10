import { NextFunction, Response, Request } from "express-serve-static-core";
export declare const retrievePasswordCode: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>, number> | undefined>;
