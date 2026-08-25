import { createAsyncThunk } from "@reduxjs/toolkit";
import sha1 from "crypto-js/sha1";

import { ENDPOINTS } from "../../../common/constants/endpoint";
import { BASE_URL } from "../../../config";

import type { LoginPayload, LoginResponse } from "./login.type";

const LOGIN_ERROR_MESSAGES: Record<string, string> = {
  USER_NOT_FOUND: "User not found",
  INVALID_PASSWORD: "Invalid password",
};

const getLoginErrorMessage = (message?: string | null): string => {
  if (!message) {
    return "Login failed";
  }

  return LOGIN_ERROR_MESSAGES[message] ?? message;
};

export const loginUser = createAsyncThunk<LoginResponse, LoginPayload>(
  "login/loginUser",

  async ({ username, password }, { rejectWithValue }) => {
    try {
      const salt = "123"; // TEMP (same as backend)
      const firstHash = sha1(password).toString();
      const hashedPassword = sha1(firstHash + salt).toString();

      const response = await fetch(`${BASE_URL}${ENDPOINTS.LOGIN}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password: hashedPassword,
          salt,
        }),
      });

      const data = await response.json();

      if (response.ok && data?.token) {
        return {
          token: data.token,
          username: data.username ?? username,
          role: data.role,
          group: data.group,
          fullName: data.fullName ?? "",
          message: data.message,
        };
      }

      if (response.status === 401) {
        return rejectWithValue(getLoginErrorMessage(data?.message));
      }

      if (!response.ok) {
        return rejectWithValue(
          getLoginErrorMessage(data?.message) || `Login failed (${response.status})`
        );
      }

      return rejectWithValue(getLoginErrorMessage(data?.message));
    } catch (error) {
      console.error(error);
      return rejectWithValue("Server error");
    }
  }
);
