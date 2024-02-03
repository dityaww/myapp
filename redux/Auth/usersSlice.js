import { createSlice } from "@reduxjs/toolkit";

initialState = {
  isFetched: false,
  msg: null,
  data: [],
  error: false,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    usersFetched: (state, action) => {
      // console.log("users fetched: ", action);
      state.isFetched = true;
      state.error = false;
      state.data = action.payload.data;
      state.msg = action.payload.message;
    },
  },
});

export const { usersFetched } = usersSlice.actions;
export default usersSlice.reducer;
