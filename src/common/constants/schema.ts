import * as Yup from "yup";

export const loginSchema = Yup.object().shape({
    username: Yup.string().required("username is required"),
    password: Yup.string().required("Password is required"),
    showPassword: Yup.boolean(),
});

export const sendMailSchema = Yup.object().shape({
    toEmail: Yup.string()
        .trim()
        .required("To Email is required")
        .email("Enter a valid email address"),
    subject: Yup.string()
        .trim()
        .required("Subject is required"),
    message: Yup.string()
        .trim()
        .required("Message is required"),
});