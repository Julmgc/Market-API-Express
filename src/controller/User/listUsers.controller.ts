import { listUsers } from "../../services/User/listUsers.services";
import { Request, Response } from "express";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await listUsers();

    res.send(users);
  } catch (e: any) {
    res.status(401).json({ message: "Missing authorization headers" });
  }
};
