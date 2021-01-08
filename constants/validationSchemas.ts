import * as yup from "yup";

const createAccountSchema = yup.object().shape({
  nickName: yup
    .string()
    .required("Nickname is required")
    .min(5, "Nickname is too short")
    .max(25, "Nickname is too long"),
  email: yup
    .string()
    .required("Email is required")
    .email("Invalid email")
    .max(25, "Email is too long"),
  password: yup
    .string()
    .required("Password is required")
    .min(5, "Password is too short")
    .max(256, "Password is too long"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
});
const loginSchema = yup.object().shape({
  email: yup.string().required("Email is required").email("Invalid email"),
  password: yup.string().required("Password is required"),
});

export { createAccountSchema, loginSchema };
