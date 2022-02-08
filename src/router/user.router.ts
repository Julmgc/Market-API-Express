import { Router } from "express";
import {
  isAuthenticated,
  isAdm_middleware,
} from "../middlewares/authentication.middleware";
import { userCreate } from "../controller/User/createUser.controller";
import { loginUser } from "../controller/User/loginUser.controller";
import { getUsers } from "../controller/User/listUsers.controller";
import { getUserProfile } from "../controller/User/getUserById.controller";
import { validate } from "../Schema/schema.validation";
import { userRegisterSchema, loginRegisterSchema } from "../Schema/schemas";
const router = Router();

export const userRouter = () => {
  router.post("/user", validate(userRegisterSchema), userCreate);
  router.post("/login", validate(loginRegisterSchema), loginUser);
  router.get("/user", isAuthenticated, isAdm_middleware, getUsers);
  router.get("/user/:id", isAuthenticated, getUserProfile);
  return router;
};
