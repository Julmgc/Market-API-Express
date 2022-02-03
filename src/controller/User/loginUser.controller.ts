import { NextFunction, Request, Response } from "express";
import { userLogin } from "../../services/User/loginUser.services";

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const token = await userLogin(email, password, res);

    res.send({ token });
  } catch (err) {
    next(err);
  }
};
