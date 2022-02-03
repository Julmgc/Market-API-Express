import { userProfile } from "../../services/User/getUserById.services";
import { Request, Response, NextFunction } from "express";

export const getUserProfile = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authenticated_user = req.user.id;
    const user_by_id = req.params.id;
    const user = await userProfile(user_by_id, authenticated_user);

    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
