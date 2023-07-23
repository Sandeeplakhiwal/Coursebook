import axios from "axios";
import { server } from "../store.js";

export const createCourse = (formdata) => async (dispatch) => {
  // title, description, category, createdBy, file
  try {
    dispatch({ type: "createCourseRequest" });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${server}/createcourse`,
      formdata,
      config
    );

    dispatch({ type: "createCourseSuccess", payload: data.message });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: "createCourseFailed",
      payload: error.response.data.message,
    });
  }
};

export const deleteCourseLecture =
  (courseId, lectureId) => async (dispatch) => {
    // courseId, lectureId
    try {
      dispatch({ type: "deleteLectureRequest" });
      const config = {
        withCredentials: true,
      };
      const { data } = await axios.delete(
        `${server}/lecture?courseId=${courseId}&lectureId=${lectureId}`,
        config
      );

      dispatch({ type: "deleteLectureSuccess", payload: data.message });
    } catch (error) {
      console.log(error.response.data.message);
      dispatch({
        type: "deleteLectureFailed",
        payload: error.response.data.message,
      });
    }
  };

export const addLecture = (id, formdata) => async (dispatch) => {
  // title, description, file, id
  try {
    dispatch({ type: "addLectureRequest" });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${server}/course/${id}`,
      formdata,
      config
    );

    dispatch({ type: "addLectureSuccess", payload: data.message });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({
      type: "addLectureFailed",
      payload: error.response.data.message,
    });
  }
};

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: "allUsersRequest" });
    const { data } = await axios.get(`${server}/admin/users`, {
      withCredentials: true,
    });
    dispatch({ type: "allUsersSuccess", payload: data });
  } catch (error) {
    console.log("error:", error.response.data.message);
    dispatch({
      type: "allUsersFailed",
      payload: error.response.data.message,
    });
  }
};

export const updateRole = (id) => async (dispatch) => {
  try {
    console.log("Id is", id);
    dispatch({ type: "updateRoleRequest" });
    const config = {
      withCredentials: true,
    };
    const { data } = await axios.put(
      `${server}/admin/updaterole/${id}`,
      {},
      config
    );

    dispatch({ type: "updateRoleSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "updateRoleFailed",
      payload: error.response.data.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    console.log("Id for delete user is", id);
    dispatch({ type: "deleteUserRequest" });
    const config = {
      withCredentials: true,
    };
    const { data } = await axios.delete(
      `${server}/admin/deleteuser/${id}`,
      config
    );

    dispatch({ type: "deleteUserSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "deleteUserFailed",
      payload: error.response.data.message,
    });
  }
};

export const getDashboardStats = () => async (dispatch) => {
  try {
    dispatch({ type: "getAdminStatsRequest" });
    const { data } = await axios.get(`${server}/admin/stats`, {
      withCredentials: true,
    });
    dispatch({ type: "getAdminStatsSuccess", payload: data });
  } catch (error) {
    console.log("error:", error.response.data.message);
    dispatch({
      type: "getAdminStatsFailed",
      payload: error.response.data.message,
    });
  }
};
