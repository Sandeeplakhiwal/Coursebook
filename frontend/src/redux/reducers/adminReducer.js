import { createReducer } from "@reduxjs/toolkit";

export const adminReducer = createReducer(
  { message: null },
  {
    createCourseRequest: (state) => {
      state.loading = true;
    },
    createCourseSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    createCourseFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteLectureRequest: (state) => {
      state.loading = true;
    },
    deleteLectureSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteLectureFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addLectureRequest: (state) => {
      state.loading = true;
    },
    addLectureSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    addLectureFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    allUsersRequest: (state) => {
      state.loading = true;
    },
    allUsersSuccess: (state, action) => {
      state.loading = false;
      state.usersData = action.payload;
    },
    allUsersFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateRoleRequest: (state) => {
      state.loading = true;
    },
    updateRoleSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    updateRoleFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteUserRequest: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteUserFailed: (state, action) => {
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
