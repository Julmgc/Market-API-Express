import { Request, Response, NextFunction } from "express";
export declare const isAuthenticated: (req: Request, res: Response, next: NextFunction) => void;
export declare const isAdm_middleware: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
