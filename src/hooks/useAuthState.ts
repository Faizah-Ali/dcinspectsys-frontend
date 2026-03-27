import { useMemo } from "react";
import { useAppSelector } from "./useAppSelector.ts";
import type { RootState } from "../redux/store.ts";
import { LOGGED_IN_KEY, USERNAME_KEY } from "../common/constants/storageKeys.ts";

interface UseAuthStateReturn {
  username: string | null;
  permissions: string[];
  hasAuthData: boolean;
  isAuthenticated: boolean;
}

export const useAuthState = (): UseAuthStateReturn => {
  const reduxAuth = useAppSelector((state: RootState) => state.auth);

  return useMemo(() => {
    const isLoggedIn = localStorage.getItem(LOGGED_IN_KEY) === "true";
    const usernameFromStorage = localStorage.getItem(USERNAME_KEY);

    // Check if user has auth data
    const hasAuthData = !!(isLoggedIn && usernameFromStorage);

    // Get username from Redux or localStorage
    const username = reduxAuth.username || usernameFromStorage || null;

    // Get permissions from Redux
    const permissions: string[] = reduxAuth.permissions || [];

    return {
      username,
      permissions,
      hasAuthData,
      isAuthenticated: reduxAuth.isAuthenticated || hasAuthData,
    };
  }, [reduxAuth.username, reduxAuth.permissions, reduxAuth.isAuthenticated]);
};
