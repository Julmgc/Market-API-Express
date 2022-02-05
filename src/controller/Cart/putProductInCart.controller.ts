import { NextFunction, Request, Response } from "express";
import { putProductInCart } from "../../services/Cart/putProductInCart.services";
import { getCustomRepository } from "typeorm";
import UserRepository from "../../repository/user.repository";
import AppError from "../../errors/AppError";
import { User } from "../../entities";
export const insertProductInCart = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { product } = req.body;

    // const usersRepository = getCustomRepository(UserRepository);
    // const user = await usersRepository.findOne({ where: { id: req.user.id } });

    const cart = await putProductInCart(product, req.user.id);
    return res.status(200).json(cart);
  } catch (err) {
    next(err);
  }
};
