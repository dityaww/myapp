import { createSlice } from "@reduxjs/toolkit";

initialState = {
  isRegistered: false,
  msg: null,
  data: [],
  error: false,
};

const registerSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    registerSuccess: (state, action) => {
      console.log("regis payload: ", action.payload);
      state.isRegistered = true;
      state.error = false;
      state.data = action.payload.data;
      state.msg = action.payload.message;
    },
    registerFailed: (state, action) => {
      state.isRegistered = true;
      state.error = true;
      state.msg = action.payload.error;
    },
  },
});

export const { registerSuccess, registerFailed } = registerSlice.actions;
export default registerSlice.reducer;
