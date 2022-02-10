import { Request, Response, NextFunction } from "express";
import * as yup from "yup";
export declare const validate: (schema: yup.AnyObjectSchema) => (req: Request, res: Response, next: NextFunction) => Promise<void>;
