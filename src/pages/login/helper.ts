import { loginSchema } from "../../common/constants/schema";
import {
  showErrorToast,
  showSuccessToast,
} from "../../components/toast/helper";
import { setAuth } from "../../redux/auth.slice";
import type { AppDispatch } from "../../redux/store";
import {
  saveLoginState,
  saveLoginTime,
  saveUsername,
} from "../../utils/authSession.utils";

import { loginUser } from "./services/login.action";
import type { LoginFormData, LoginFormErrors } from "./type";

export const initialLoginForm: LoginFormData = {
  username: "",
  password: "",
  showPassword: false,
};

export const validateForm = async (
  formData: LoginFormData
): Promise<LoginFormErrors> => {
  try {
    await loginSchema.validate(formData, { abortEarly: false });
    return {};
  } catch (error: any) {
    const errors: LoginFormErrors = {};

    if (error.inner) {
      error.inner.forEach((err: any) => {
        if (err.path) {
          errors[err.path as keyof LoginFormErrors] = err.message;
        }
      });
    }

    return errors;
  }
};

export const handleChange =
  (
    field: keyof LoginFormData,
    setFormData: React.Dispatch<React.SetStateAction<LoginFormData>>,
    errors: LoginFormErrors,
    setErrors: React.Dispatch<React.SetStateAction<LoginFormErrors>>
  ) =>
  (event: React.ChangeEvent<HTMLInputElement>) => {
    const value =
      field === "showPassword" ? event.target.checked : event.target.value;

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errors[field as keyof LoginFormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

export const handleSubmit =
  (
    formData: LoginFormData,
    setErrors: React.Dispatch<React.SetStateAction<LoginFormErrors>>,
    dispatch: AppDispatch,
    onLoginSuccess: () => void
  ) =>
  async (event: React.FormEvent) => {
    event.preventDefault();

    const validationErrors = await validateForm(formData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      showErrorToast("Please fix the form errors");
      return;
    }

    try {
      const data = await dispatch(
        loginUser({
          username: formData.username,
          password: formData.password,
        })
      ).unwrap();

      localStorage.setItem("token", data.token);

      saveLoginState(true);
      saveUsername(data.username);
      saveLoginTime();

      dispatch(
        setAuth({
          username: data.username,
          permissions: [],
        })
      );

      showSuccessToast("Login successful!");
      onLoginSuccess();
    } catch (error) {
      showErrorToast(
        typeof error === "string" ? error : "Login failed"
      );
    }
  };
