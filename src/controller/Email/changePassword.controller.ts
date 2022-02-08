import { NextFunction, Response, Request } from "express-serve-static-core";
import { changeUserPassword } from "../../services/Email/changePasswordEmail.services";
export const changePassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    const { code, password, confirmation } = req.body;

    const new_password = await changeUserPassword(
      email,
      code,
      password,
      confirmation
    );

    return res.status(201).json("Your password was changed.");
  } catch (err) {
    next(err);
  }
};
