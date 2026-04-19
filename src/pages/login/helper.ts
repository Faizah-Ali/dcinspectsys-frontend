import { toast } from "react-toastify";
import { loginSchema } from "../../common/constants/schema.ts";
import { saveLoginState, saveUsername, saveLoginTime } from "../../utils/authSession.utils.ts";
import { store } from "../../redux/store.ts";
import { setAuth } from "../../redux/auth.slice.ts";
import type { LoginFormData, LoginFormErrors } from "./type.ts";
import sha256 from "crypto-js/sha256";
import { BASE_URL } from "../../config";

// Validate form data using Yup schema
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

// Handle input changes
export const handleChange = (
  field: keyof LoginFormData,
  setFormData: React.Dispatch<React.SetStateAction<LoginFormData>>,
  errors: LoginFormErrors,
  setErrors: React.Dispatch<React.SetStateAction<LoginFormErrors>>
) => (e: React.ChangeEvent<HTMLInputElement>) => {
  const value = field === "showPassword" ? e.target.checked : e.target.value;
  setFormData((prev) => ({
    ...prev,
    [field]: value,
  }));
  // Clear error when user starts typing
  if (errors[field as keyof LoginFormErrors]) {
    setErrors((prev) => ({
      ...prev,
      [field]: undefined,
    }));
  }
};

// Handle form submission
export const handleSubmit = (
  formData: LoginFormData,
  setErrors: React.Dispatch<React.SetStateAction<LoginFormErrors>>,
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
  onLoginSuccess: () => void
) => async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  const validationErrors = await validateForm(formData);

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    setIsSubmitting(false);
    toast.error("Please fix the form errors");
    return;
  }

  try {
    const salt = "123"; // TEMP (same as backend)

    // 🔐 HASH PASSWORD HERE
    const hashedPassword = sha256(formData.password + salt).toString();
    const response = await fetch(`${BASE_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: formData.username,
        password: hashedPassword, 
        salt: salt
      }),
    });

  const data = await response.json();

  if (data && data.token) {
    localStorage.setItem("token", data.token);

    saveLoginState(true);
    saveUsername(formData.username);
    saveLoginTime();

    store.dispatch(setAuth({
      username: formData.username,
      permissions: [],
    }));

    toast.success("Login successful!");
    onLoginSuccess();

  } else {
    toast.error(data.message || "Login failed");
  }
    } catch (error) {
      console.error(error);
      toast.error("Server error");
    }

    setIsSubmitting(false);
  };