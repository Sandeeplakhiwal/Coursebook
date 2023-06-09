import { createReducer } from "@reduxjs/toolkit";

export const courseReducer = createReducer(
  { isAuthenticated: false, user: null },
  {
    allCoursesRequest: (state) => {
      state.loading = true;
    },
    allCoursesSuccess: (state, action) => {
      state.loading = false;
      state.courses = action.payload;
    },
    allCoursesFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addToPlaylistRequest: (state) => {
      state.loading = true;
    },
    addToPlaylistSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    addToPlaylistFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
  }
);
