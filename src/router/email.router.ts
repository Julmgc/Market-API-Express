import { Router } from "express";
import {
  isAuthenticated,
  isAdm_middleware,
} from "../middlewares/authentication.middleware";
import { sendEmail } from "../controller/Email/sendEmail.controller";
import { retrievePasswordCode } from "../controller/Email/retrievePasswordCode.controller";
import { changePassword } from "../controller/Email/changePassword.controller";

const router = Router();

export const emailRouter = () => {
  router.post("/email", isAuthenticated, isAdm_middleware, sendEmail);
  router.post("/recuperar", isAuthenticated, retrievePasswordCode);
  router.post("/alterar_senha", isAuthenticated, changePassword);
  return router;
};
