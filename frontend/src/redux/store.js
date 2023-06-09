import { configureStore } from "@reduxjs/toolkit";
import { courseReducer } from "./reducers/courseReducer.js";
import {
  profileReducer,
  subscriptionReducer,
  userReducer,
} from "./reducers/userReducer.js";

const store = configureStore({
  reducer: {
    user: userReducer,
    profile: profileReducer,
    course: courseReducer,
    subscription: subscriptionReducer,
  },
});

export default store;

export const server = "https://coursebook-webservices.onrender.com/api/v1";
