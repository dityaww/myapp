import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth/authSlice";
import registerReducer from "./Auth/registerSlice";
import usersReducer from "./Auth/usersSlice";
import allpostReducer from "./Content/allpostSlice"
import searchdatauserReducer from "./Search/searchdatauserSlice"
import reservasiReducer from './Reservasi/reservasiSlice'
import createreservasiReducer from './Reservasi/createreservasiSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    registration: registerReducer,
    users: usersReducer,
    reservasi: reservasiReducer,
    create: createreservasiReducer
  },
});
