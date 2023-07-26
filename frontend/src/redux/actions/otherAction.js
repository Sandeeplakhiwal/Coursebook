import axios from "axios";
import { server } from "../store";

export const contact = (name, email, message) => async (dispatch) => {
  try {
    dispatch({ type: "contactRequest" });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${server}/contact`,
      { name, email, message },
      config
    );
    dispatch({ type: "contactSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "contactFailed", payload: error.response.data.message });
  }
};

export const requestNewCourse = (name, email, course) => async (dispatch) => {
  try {
    dispatch({ type: "newCourseRequest" });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };
    const { data } = await axios.post(
      `${server}/courserequest`,
      { name, email, course },
      config
    );
    dispatch({ type: "newCourseSuccess", payload: data.message });
  } catch (error) {
    dispatch({ type: "newCourseFailed", payload: error.response.data.message });
  }
};
