import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getLoginState, getUsername, getRole } from "../utils/authSession.utils";

export interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  role: string | null;
  permissions: string[];
}

// ✅ SINGLE SOURCE OF TRUTH
const initialState: AuthState = {
  isAuthenticated: getLoginState(),
  username: getLoginState() ? getUsername() : null,
  role: getLoginState() ? getRole() : null,
  permissions: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{
        username: string;
        role?: string | null;
        permissions?: string[];
      }>
    ) => {
      state.isAuthenticated = true;
      state.username = action.payload.username;
      if (action.payload.role !== undefined) {
        state.role = action.payload.role;
      }
      state.permissions = action.payload.permissions || [];
    },
    clearAuth: (state) => {
      state.isAuthenticated = false;
      state.username = null;
      state.role = null;
      state.permissions = [];
    },
    setUsername: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
    },
    setPermissions: (state, action: PayloadAction<string[]>) => {
      state.permissions = action.payload;
    },
  },
});

export const { setAuth, clearAuth, setUsername, setPermissions } =
  authSlice.actions;

export default authSlice.reducer;
