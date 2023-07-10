import { configureStore } from "@reduxjs/toolkit";
import { profileReducer, userReducer } from "./reducers/userReducer.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
  },
});

export default store;

export const server = "https://coursebook-webservices.onrender.com/api/v1";
