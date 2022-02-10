import { Response } from "express";
export declare const userLogin: (email: string, password: string, res: Response) => Promise<string | undefined>;
