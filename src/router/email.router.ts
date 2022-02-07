import { Router } from "express";
import {
  isAuthenticated,
  isAdm_middleware,
} from "../middlewares/authentication.middleware";
import { sendEmail } from "../controller/Email/sendEmail.controller";
// import { sendCode } from "../controller/Email/sendCode.controller";
// import {  changePassword} from "../controller/Email/changePassword.controller

const router = Router();

export const emailRouter = () => {
  router.post("/email", isAuthenticated, isAdm_middleware, sendEmail);
  // router.post("/recuperar", isAuthenticated, sendCode);
  // router.post("/alterar_senha", isAuthenticated, changePassword);
  return router;
};
