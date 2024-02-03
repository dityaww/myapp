import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  msg: null,
  token: null,
  error: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      //   console.log("payload:", action.payload);
      state.isLoggedIn = true;
      state.msg = action.payload.message;
      state.token = action.payload.data.token;
      state.error = false;
    },
    loginFailed: (state, action) => {
      //   console.log("error:", action.payload.error);
      state.isLoggedIn = true;
      state.msg = action.payload.error;
      state.token = null;
      state.error = true;
    },
    logout: (state, action) => {
      state.isLoggedIn = false;
      state.token = null;
      state.msg = 'logout success!'
    },
  },
});

export const { loginSuccess, loginFailed, logout } = authSlice.actions;
export default authSlice.reducer;
