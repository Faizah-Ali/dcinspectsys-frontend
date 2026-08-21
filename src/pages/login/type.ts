export interface LoginFormData {
  username: string;
  password: string;
  showPassword: boolean;
  rememberMe: boolean;
}

export interface LoginFormErrors {
  username?: string;
  password?: string;
}

export interface LoginProps {
  onLoginSuccess: () => void;
}