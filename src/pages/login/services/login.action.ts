import { createAsyncThunk } from "@reduxjs/toolkit";
import sha1 from "crypto-js/sha1";

import { ENDPOINTS } from "../../../common/constants/endpoint";
import { BASE_URL } from "../../../config";

import type { LoginPayload, LoginResponse } from "./login.type";

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

      if (data && data.token) {
        return {
          token: data.token,
          username: data.username ?? username,
          role: data.role,
          message: data.message,
        };
      }

      return rejectWithValue(data.message || "Login failed");
    } catch (error) {
      console.error(error);
      return rejectWithValue("Server error");
    }
  }
);
