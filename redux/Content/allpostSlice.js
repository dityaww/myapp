import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: null,
    msg: null,
    data: [],
    error: false
} 

const allpostSlice = createSlice({
    name: 'allpost',
    initialState,
    reducers: {
        allData: (state, action) => {
            // console.log(action.payload);
            state.status = 'success'
            state.msg = action.payload.message
            state.data = action.payload.data
            state.error = false
        }
    }
})

export const { allData } = allpostSlice.actions;
export default allpostSlice.reducer;
