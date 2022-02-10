import * as yup from "yup";

export const userRegisterSchema = yup.object().shape({
  name: yup.string().required("Name field is required"),
  email: yup
    .string()
    .email("Must be a valid email")
    .max(255)
    .required("Email field is required"),
  password: yup.string().required("Password field is required"),
  isAdm: yup.boolean().required("isAdm field is required"),
});

export const loginRegisterSchema = yup.object().shape({
  email: yup
    .string()
    .email("Must be a valid email")
    .max(255)
    .required("Email field is required"),
  password: yup.string().required("Password field is required"),
});

export const productRegisterSchema = yup.object().shape({
  name: yup.string().required("Name field is required"),
  price: yup.number().required("Price field is required"),
  description: yup.string().required("Description field is required"),
});

export const putProductInCartRegisterSchema = yup.object().shape({
  productId: yup.number().required("ProductId field is required"),
});

export const sendEmailSchema = yup.object().shape({
  subject: yup.string().required("Subject field is required"),
  text: yup.string().required("text field is required"),
  email: yup.string().required("email field is required"),
});

export const retrievePasswordSchema = yup.object().shape({
  email: yup.string().required("email field is required"),
});

export const changePasswordEmailSchema = yup.object().shape({
  code: yup.string().required("Code field is required"),
  password: yup.string().required("Password field is required"),
  confirmation: yup.string().required("Confirmation field is required"),
  email: yup.string().required("email field is required"),
});
