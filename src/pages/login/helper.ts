import { loginSchema } from "../../common/constants/schema";
import {
  REMEMBER_CREDENTIALS_KEY,
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

const MAX_REMEMBERED_CREDENTIALS = 10;

type RememberedCredential = {
  username: string;
  password: string;
};

export const initialLoginForm: LoginFormData = {
  username: "",
  password: "",
  showPassword: false,
  rememberMe: false,
};

const credentialKey = (username: string) => username.trim().toLowerCase();

/** Read multi-account map; migrate legacy single-user Remember Me keys if needed. */
export const getRememberedCredentialsMap = (): Record<
  string,
  RememberedCredential
> => {
  try {
    const raw = localStorage.getItem(REMEMBER_CREDENTIALS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        const map: Record<string, RememberedCredential> = {};
        for (const [key, value] of Object.entries(parsed)) {
          if (
            value &&
            typeof value === "object" &&
            typeof (value as RememberedCredential).username === "string" &&
            typeof (value as RememberedCredential).password === "string"
          ) {
            const entry = value as RememberedCredential;
            map[credentialKey(key)] = {
              username: entry.username,
              password: entry.password,
            };
          }
        }
        return map;
      }
    }

    // Legacy: only the last remembered username/password existed.
    if (localStorage.getItem(REMEMBER_ME_KEY) === "true") {
      const username = localStorage.getItem(REMEMBER_USERNAME_KEY) || "";
      const password = localStorage.getItem(REMEMBER_PASSWORD_KEY) || "";
      if (username) {
        const map = {
          [credentialKey(username)]: { username, password },
        };
        localStorage.setItem(REMEMBER_CREDENTIALS_KEY, JSON.stringify(map));
        return map;
      }
    }

    return {};
  } catch {
    return {};
  }
};

const persistRememberedCredentialsMap = (
  map: Record<string, RememberedCredential>
) => {
  const keys = Object.keys(map);
  if (keys.length === 0) {
    localStorage.removeItem(REMEMBER_CREDENTIALS_KEY);
    localStorage.removeItem(REMEMBER_ME_KEY);
    localStorage.removeItem(REMEMBER_USERNAME_KEY);
    localStorage.removeItem(REMEMBER_PASSWORD_KEY);
    return;
  }

  localStorage.setItem(REMEMBER_CREDENTIALS_KEY, JSON.stringify(map));
  localStorage.setItem(REMEMBER_ME_KEY, "true");
};

export const getSavedCredentialForUsername = (
  username: string
): RememberedCredential | null => {
  const key = credentialKey(username);
  if (!key) {
    return null;
  }

  return getRememberedCredentialsMap()[key] ?? null;
};

/** Last-used remembered account (for initial form hydrate after logout). */
export const getSavedCredentials = (): RememberedCredential | null => {
  try {
    if (localStorage.getItem(REMEMBER_ME_KEY) !== "true") {
      return null;
    }

    const lastUsername = localStorage.getItem(REMEMBER_USERNAME_KEY) || "";
    if (lastUsername) {
      const matched = getSavedCredentialForUsername(lastUsername);
      if (matched) {
        return matched;
      }
    }

    const map = getRememberedCredentialsMap();
    const first = Object.values(map)[0];
    return first ?? null;
  } catch {
    return null;
  }
};

/** Initial login form, hydrated once from Remember Me localStorage when present. */
export const getInitialLoginForm = (): LoginFormData => {
  const saved = getSavedCredentials();

  if (!saved || saved.username === "") {
    return initialLoginForm;
  }

  return {
    ...initialLoginForm,
    username: saved.username,
    password: saved.password,
    rememberMe: true,
  };
};

export const getUsernameHistory = (): string[] => {
  try {
    const raw = localStorage.getItem(USERNAME_HISTORY_KEY);
    if (!raw) {
      const remembered = Object.values(getRememberedCredentialsMap()).map(
        (entry) => entry.username
      );
      return remembered;
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
  const map = getRememberedCredentialsMap();
  const key = credentialKey(formData.username);

  if (formData.rememberMe && key) {
    // Keep most-recent first by rebuilding with this account at the front.
    const next: Record<string, RememberedCredential> = {
      [key]: {
        username: formData.username.trim(),
        password: formData.password,
      },
    };

    for (const [existingKey, entry] of Object.entries(map)) {
      if (existingKey === key) {
        continue;
      }
      if (Object.keys(next).length >= MAX_REMEMBERED_CREDENTIALS) {
        break;
      }
      next[existingKey] = entry;
    }

    persistRememberedCredentialsMap(next);
    localStorage.setItem(REMEMBER_USERNAME_KEY, formData.username.trim());
    localStorage.setItem(REMEMBER_PASSWORD_KEY, formData.password);
    return;
  }

  // Remember Me unchecked: drop only this username from the map.
  if (key && map[key]) {
    delete map[key];
    persistRememberedCredentialsMap(map);

    const remaining = Object.values(map)[0];
    if (remaining) {
      localStorage.setItem(REMEMBER_USERNAME_KEY, remaining.username);
      localStorage.setItem(REMEMBER_PASSWORD_KEY, remaining.password);
    }
    return;
  }

  persistRememberedCredentialsMap(map);
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
      const matched = getSavedCredentialForUsername(value);

      setFormData((prev) => {
        const previousMatch = getSavedCredentialForUsername(prev.username);
        const wasAutofilledPassword =
          !!previousMatch && prev.password === previousMatch.password;

        return {
          ...prev,
          username: value,
          password: matched
            ? matched.password
            : wasAutofilledPassword
              ? ""
              : prev.password,
          rememberMe: matched ? true : prev.rememberMe,
        };
      });
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
