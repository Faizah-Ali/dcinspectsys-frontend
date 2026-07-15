// Auth helper functions for managing login state and user info

import { USERNAME_KEY, ROLE_KEY, GROUP_KEY, LOGGED_IN_KEY, LOGIN_TIME_KEY } from "../common/constants/storageKeys";
import { showErrorToast } from "../components/toast/helper";
import { store } from "../redux/store";
import { clearAuth } from "../redux/auth.slice";

// Save login state to localStorage
export const saveLoginState = (isLoggedIn: boolean) => {
  localStorage.setItem(LOGGED_IN_KEY, JSON.stringify(isLoggedIn));
};

// Save username to localStorage
export const saveUsername = (username: string) => {
  localStorage.setItem(USERNAME_KEY, username);
};

// Save role to localStorage
export const saveRole = (role: string) => {
  localStorage.setItem(ROLE_KEY, role);
};

// Save group to localStorage
export const saveGroup = (group: string) => {
  localStorage.setItem(GROUP_KEY, group);
};

// Save login time to localStorage
export const saveLoginTime = () => {
  const time = new Date().getTime();
  localStorage.setItem(LOGIN_TIME_KEY, time.toString()); 
};

// Get login state from localStorage
export const getLoginState = (): boolean => {
  try {
    const loggedIn = localStorage.getItem(LOGGED_IN_KEY);
    if (loggedIn) {
      return JSON.parse(loggedIn) === true;
    }
  } catch (error) {
    console.error("Error reading auth state:", error);
  }
  return false;
};

// Get username from localStorage
export const getUsername = (): string => {
  try {
    return localStorage.getItem(USERNAME_KEY) || "";
  } catch (error) {
    console.error("Error reading username:", error);
  }
  return "";
};

// Get role from localStorage
export const getRole = (): string => {
  try {
    return localStorage.getItem(ROLE_KEY) || "";
  } catch (error) {
    console.error("Error reading role:", error);
  }
  return "";
};

// Remove role from localStorage
export const removeRole = () => {
  localStorage.removeItem(ROLE_KEY);
};

// Get group from localStorage
export const getGroup = (): string => {
  try {
    return localStorage.getItem(GROUP_KEY) || "";
  } catch (error) {
    console.error("Error reading group:", error);
  }
  return "";
};

// Remove group from localStorage
export const removeGroup = () => {
  localStorage.removeItem(GROUP_KEY);
};

// Get login time from localStorage and format it
export const getLoginTime = (): string => {
  try {
    const loginTimeStr = localStorage.getItem(LOGIN_TIME_KEY);

    if (!loginTimeStr) return "";

    const loginDate = new Date(parseInt(loginTimeStr, 10));

    if (isNaN(loginDate.getTime())) return "";

    return formatLoginTime(loginDate);

  } catch (error) {
    console.error("Error reading login time:", error);
    return "";
  }
};

export const isSessionValid = () => {
  const loginTime = localStorage.getItem(LOGIN_TIME_KEY); 

  if (!loginTime) return false;

  const sessionTime = parseInt(loginTime, 10);
  if (isNaN(sessionTime)) return false;

  const currentTime = new Date().getTime();
  const SESSION_DURATION = 30 * 60 * 1000;

  return currentTime - sessionTime < SESSION_DURATION;
};
// Format date and time with AM/PM
const formatLoginTime = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  
  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  
  return `${day}/${month}/${year} ${displayHours}:${minutes} ${ampm}`;
};

// Logout function - clears all storage and redirects to login
export const logout = (message?: string) => {
  try {
    localStorage.clear();
    sessionStorage.clear();

    store.dispatch(clearAuth());

    if (message) {
      showErrorToast(message);
    }

    setTimeout(() => {
      window.location.href = "/#/";
    }, 1000);

  } catch (error) {
    console.error(error);
  }
};
