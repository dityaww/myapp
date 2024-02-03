import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: null,
    msg: null,
    data: [],
    error: false
} 

const searchdatauserSlice = createSlice({
    name: 'searchdata',
    initialState,
    reducers: {
        searchData: (state, action) => {
            // console.log("payload search", action.payload);
            state.status = action.payload.status
            state.msg = action.payload.message
            state.data = action.payload.data
            state.error = false
        }
    }
})

export const { searchData } = searchdatauserSlice.actions;
export default searchdatauserSlice.reducer;
