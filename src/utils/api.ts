const BASE_URL = "/inspection-system-0.0.1-SNAPSHOT";

export const authFetch = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token");

  return fetch(BASE_URL + url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });
};