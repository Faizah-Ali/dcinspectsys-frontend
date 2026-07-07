import { createSlice } from "@reduxjs/toolkit";

import { loginUser } from "./login.action";

interface LoginState {
  loading: boolean;
}

const initialState: LoginState = {
  loading: false,
};

const loginSlice = createSlice({
  name: "login",

  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(loginUser.fulfilled, (state) => {
      state.loading = false;
    });

    builder.addCase(loginUser.rejected, (state) => {
      state.loading = false;
    });
  },
});

export default loginSlice.reducer;
