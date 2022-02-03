import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import UserRepository from "../repository/user.repository";
import AppError from "../errors/AppError";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  jwt.verify(
    token as string,
    process.env.SECRET as string,
    (err: any, decoded: any) => {
      if (err) {
        return next(new AppError("Missing authorization headers", 401));
      }

      const userid = decoded.id;
      req.user = { id: userid };
      next();
    }
  );
};

export const isAdm_middleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const usersRepository = getCustomRepository(UserRepository);
  const userAdm = await usersRepository.findOne({
    where: { id: req.user?.id },
  });

  if (!userAdm?.isAdm) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
};
