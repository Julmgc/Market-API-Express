import { Router } from "express";

import { create } from "../controller/User/createUser.controller";

const router = Router();

export const userRouter = () => {
  router.post("", create);

  return router;
};
