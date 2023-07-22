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
