import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: null,
  msg: null,
  data: [],
  error: false,
};

const createreservasiSlice = createSlice({
  name: "create",
  initialState,
  reducers: {
    postReservasiSuccess: (state, action) => {
      state.status = true;
      state.msg = action.payload.message;
      state.data = action.payload.data;
      state.error = false;
    },
    postReservasiFailed: (state, action) => {
      state.status = false;
      state.msg = action.payload.message;
      state.error = true;
    },
  },
});

export const { postReservasiSuccess, postReservasiFailed } = createreservasiSlice.actions;
export default createreservasiSlice.reducer;
