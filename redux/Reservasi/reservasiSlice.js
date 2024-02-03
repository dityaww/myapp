import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: null,
  msg: null,
  data: [],
  error: false,
};

const reservasiSlice = createSlice({
  name: "reservasi",
  initialState,
  reducers: {
    getReservasiSuccess: (state, action) => {
      state.status = true;
      state.msg = action.payload.message;
      state.data = action.payload.data;
      state.error = false;
    },
    getReservasiFailed: (state, action) => {
      state.status = false;
      state.msg = action.payload.message;
      state.error = true;
    },
  },
});

export const { createReservasi, getReservasiSuccess, getReservasiFailed } = reservasiSlice.actions;
export default reservasiSlice.reducer;
