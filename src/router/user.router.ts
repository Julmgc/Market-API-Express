import { Router } from "express";
import {
  isAuthenticated,
  isAdm_middleware,
} from "../middlewares/authentication.middleware";
import { userCreate } from "../controller/User/createUser.controller";
import { loginUser } from "../controller/User/loginUser.controller";
import { getUsers } from "../controller/User/listUsers.controller";
import { getUserProfile } from "../controller/User/getUserById.controller";
const router = Router();

export const userRouter = () => {
  router.post("/user", userCreate);
  router.post("/login", loginUser);
  router.get("/user", isAuthenticated, isAdm_middleware, getUsers);
  router.get("/user/:id", isAuthenticated, getUserProfile);
  return router;
};
