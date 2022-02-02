// import jwt from "jsonwebtoken";
// import { Request, Response, NextFunction } from "express";
// import { getCustomRepository } from "typeorm";
// import UserRepository from "../repository/user.repository";
// import AppError from "../errors/AppError";

// export const isAuthenticated = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const token = req.headers.authorization?.split(" ")[1];

//   jwt.verify(
//     token as string,
//     process.env.SECRET as string,
//     (err: any, decoded: any) => {
//       if (err) {
//         return next(new AppError("Missing authorization headers", 401));
//       }

//       const userUiid = decoded.uuid;
//       req.user = { uuid: userUiid };
//       next();
//     }
//   );
// };

// export const isAdm_get_all_users = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   const usersRepository = getCustomRepository(UserRepository);
//   const userAdm = await usersRepository.findOne({
//     where: { uuid: req.user?.uuid },
//   });

//   if (!userAdm?.isAdm) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }

//   next();
// };
