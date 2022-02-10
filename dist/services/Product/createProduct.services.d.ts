import { ProductData } from "../../types/productTypes";
import { Response } from "express";
export declare const createProduct: (body: ProductData, res: Response) => Promise<import("../../entities/Product").default>;
