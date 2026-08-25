import { loginSchema } from "../../common/constants/schema";
import {
  REMEMBER_ME_KEY,
  REMEMBER_PASSWORD_KEY,
  REMEMBER_USERNAME_KEY,
  USERNAME_HISTORY_KEY,
} from "../../common/constants/storageKeys";
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
  saveFullName,
  saveRole,
  saveGroup,
} from "../../utils/authSession.utils";

import { loginUser } from "./services/login.action";
import type { LoginFormData, LoginFormErrors } from "./type";

export const USERNAME_SUGGESTIONS_LIST_ID = "login-username-suggestions";

export const initialLoginForm: LoginFormData = {
  username: "",
  password: "",
  showPassword: false,
  rememberMe: false,
};

const getSavedCredentials = () => {
  try {
    if (localStorage.getItem(REMEMBER_ME_KEY) !== "true") {
      return null;
    }

    return {
      username: localStorage.getItem(REMEMBER_USERNAME_KEY) || "",
      password: localStorage.getItem(REMEMBER_PASSWORD_KEY) || "",
    };
  } catch {
    return null;
  }
};

export const getUsernameHistory = (): string[] => {
  try {
    const raw = localStorage.getItem(USERNAME_HISTORY_KEY);
    if (!raw) {
      const remembered = localStorage.getItem(REMEMBER_USERNAME_KEY);
      return remembered ? [remembered] : [];
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (value): value is string =>
        typeof value === "string" && value.trim() !== ""
    );
  } catch {
    return [];
  }
};

export const saveUsernameToHistory = (username: string) => {
  const trimmed = username.trim();
  if (!trimmed) {
    return;
  }

  const history = getUsernameHistory().filter(
    (value) => value.toLowerCase() !== trimmed.toLowerCase()
  );
  history.unshift(trimmed);
  localStorage.setItem(
    USERNAME_HISTORY_KEY,
    JSON.stringify(history.slice(0, 10))
  );
};

export const saveRememberedCredentials = (formData: LoginFormData) => {
  if (formData.rememberMe) {
    localStorage.setItem(REMEMBER_ME_KEY, "true");
    localStorage.setItem(REMEMBER_USERNAME_KEY, formData.username);
    localStorage.setItem(REMEMBER_PASSWORD_KEY, formData.password);
    return;
  }

  localStorage.removeItem(REMEMBER_ME_KEY);
  localStorage.removeItem(REMEMBER_USERNAME_KEY);
  localStorage.removeItem(REMEMBER_PASSWORD_KEY);
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
    if (field === "showPassword" || field === "rememberMe") {
      setFormData((prev) => ({
        ...prev,
        [field]: event.target.checked,
      }));
      return;
    }

    const value = event.target.value;

    if (field === "username") {
      const saved = getSavedCredentials();
      const matched =
        !!saved && saved.username !== "" && value === saved.username;

      setFormData((prev) => ({
        ...prev,
        username: value,
        password: matched
          ? saved.password
          : prev.password === saved?.password
            ? ""
            : prev.password,
        rememberMe: matched ? true : prev.rememberMe,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }

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
      showErrorToast("Please fill the required fields");
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
      saveFullName(data.fullName || data.username);
      saveRole(data.role);
      saveGroup(data.group);
      saveLoginTime();
      saveUsernameToHistory(formData.username);
      saveRememberedCredentials(formData);

      dispatch(
        setAuth({
          username: data.username,
          fullName: data.fullName || data.username,
          role: data.role,
          group: data.group,
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
