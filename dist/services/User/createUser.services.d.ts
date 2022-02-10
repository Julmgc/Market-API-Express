import { UserData } from "../../types/userTypes";
import { Response } from "express";
export declare const createUser: (body: UserData, res: Response) => Promise<{
    uuid: string;
    createdOn: Date;
    updatedOn: Date;
    name: string;
    email: string;
    isAdm: boolean;
}>;
