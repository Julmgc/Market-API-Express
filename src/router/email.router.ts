import { Router } from "express";
import {
  isAuthenticated,
  isAdm_middleware,
} from "../middlewares/authentication.middleware";
import { sendEmail } from "../controller/Email/sendEmail.controller";
import { retrievePasswordCode } from "../controller/Email/retrievePasswordCode.controller";
import { changePassword } from "../controller/Email/changePassword.controller";
import { validate } from "../Schema/schema.validation";
import {
  sendEmailSchema,
  retrievePasswordSchema,
  changePasswordEmailSchema,
} from "../Schema/schemas";
const router = Router();

export const emailRouter = () => {
  router.post(
    "/email",
    validate(sendEmailSchema),
    isAuthenticated,
    isAdm_middleware,
    sendEmail
  );
  router.post(
    "/recuperar",
    validate(retrievePasswordSchema),
    retrievePasswordCode
  );
  router.post(
    "/alterar_senha",
    validate(changePasswordEmailSchema),
    changePassword
  );
  return router;
};
