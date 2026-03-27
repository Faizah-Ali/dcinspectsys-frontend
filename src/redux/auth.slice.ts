import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { getLoginState, getUsername } from "../utils/authSession.utils.ts";

export interface AuthState {
    isAuthenticated: boolean;
    username: string | null;
    permissions: string[];
}

// Initialize state from localStorage if available
const getInitialState = (): AuthState => {
    const isLoggedIn = getLoginState();
    const username = getUsername();
    
    return {
        isAuthenticated: isLoggedIn,
        username: isLoggedIn && username ? username : null,
        permissions: [],
    };
};

const initialState: AuthState = getInitialState();

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<{ username: string; permissions?: string[] }>) => {
            state.isAuthenticated = true;
            state.username = action.payload.username;
            state.permissions = action.payload.permissions || [];
        },
        clearAuth: (state) => {
            state.isAuthenticated = false;
            state.username = null;
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

export const { setAuth, clearAuth, setUsername, setPermissions } = authSlice.actions;
export default authSlice.reducer;