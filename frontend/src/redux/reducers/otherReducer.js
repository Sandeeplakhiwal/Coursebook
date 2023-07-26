import { createReducer } from "@reduxjs/toolkit";

export const otherReducer = createReducer(
  { message: null },
  {
    contactRequest: (state) => {
      state.loading = true;
    },
    contactSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    contactFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    newCourseRequest: (state) => {
      state.loading = true;
    },
    newCourseSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    newCourseFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearMessage: (state) => {
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  }
);
