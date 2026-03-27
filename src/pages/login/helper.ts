import { toast } from "react-toastify";
import { loginSchema } from "../../common/constants/schema.ts";
import { saveLoginState, saveUsername, saveLoginTime } from "../../utils/authSession.utils.ts";
import { store } from "../../redux/store.ts";
import { setAuth } from "../../redux/auth.slice.ts";
import type { LoginFormData, LoginFormErrors } from "./type.ts";

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

// Check if credentials are correct
export const checkCredentials = (
  username: string,
  password: string
): boolean => {
  return username === "faizah" && password === "abc123";
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
  setFormData: React.Dispatch<React.SetStateAction<LoginFormData>>,
  setIsSubmitting: React.Dispatch<React.SetStateAction<boolean>>,
  onLoginSuccess: () => void
) => async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);

  // Validate form using schema
  const validationErrors = await validateForm(formData);
  
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    setIsSubmitting(false);
    toast.error("Please fix the form errors");
    return;
  }

  // Check credentials
  const isValid = checkCredentials(formData.username, formData.password);

  if (isValid) {
    // Save login state, username, and login time to localStorage
    saveLoginState(true);
    saveUsername(formData.username);
    saveLoginTime();
    
    // Update Redux state
    store.dispatch(setAuth({
      username: formData.username,
      permissions: [],
    }));
    
    toast.success("Login successful!");
    // Call the callback to navigate to table page
    setTimeout(() => {
      onLoginSuccess();
    }, 1000); // Small delay to show success message
  } else {
    toast.error("Invalid username or password");
    setFormData((prev) => ({
      ...prev,
      password: "",
    }));
  }

  setIsSubmitting(false);
};
