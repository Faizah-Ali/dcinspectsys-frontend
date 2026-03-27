// Auth helper functions for managing login state and user info

import { USERNAME_KEY, LOGGED_IN_KEY, LOGIN_TIME_KEY } from "../common/constants/storageKeys";

// Save login state to localStorage
export const saveLoginState = (isLoggedIn: boolean) => {
  localStorage.setItem(LOGGED_IN_KEY, JSON.stringify(isLoggedIn));
};

// Save username to localStorage
export const saveUsername = (username: string) => {
  localStorage.setItem(USERNAME_KEY, username);
};

// Save login time to localStorage
export const saveLoginTime = () => {
  const now = new Date();
  localStorage.setItem(LOGIN_TIME_KEY, now.toISOString());
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

// Get login time from localStorage and format it
export const getLoginTime = (): string => {
  try {
    const loginTimeStr = localStorage.getItem(LOGIN_TIME_KEY);
    if (loginTimeStr) {
      const loginDate = new Date(loginTimeStr);
      // Check if date is valid
      if (!isNaN(loginDate.getTime())) {
        return formatLoginTime(loginDate);
      }
    }
    // If no login time exists, create one from current time (for users who logged in before this feature)
    const now = new Date();
    const formattedTime = formatLoginTime(now);
    // Save it for future use
    saveLoginTime();
    return formattedTime;
  } catch (error) {
    console.error("Error reading login time:", error);
  }
  return "";
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
export const logout = () => {
  try {
    // Clear localStorage items
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(LOGGED_IN_KEY);
    localStorage.removeItem(LOGIN_TIME_KEY);
    
    // Clear sessionStorage
    sessionStorage.clear();
  } catch (error) {
    console.error("Error during logout:", error);
  } finally {
    // Reload page to redirect to login
    window.location.reload();
  }
};
