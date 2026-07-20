import { BASE_URL } from "../config";

export const authFetch = async (url: string, options: RequestInit = {}) => {
  const token = localStorage.getItem("token");
  const isFormData =
    typeof FormData !== "undefined" && options.body instanceof FormData;

  return fetch(BASE_URL + url, {
    ...options,
    headers: {
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      Authorization: `Bearer ${token}`,
      ...(options.headers || {}),
    },
  });
};