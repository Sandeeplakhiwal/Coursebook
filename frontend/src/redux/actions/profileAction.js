import axios from "axios";

export const updateProfile = (name, email) => async (dispatch) => {
  try {
    dispatch({ type: "updateProfileRequest" });
    const { data } = await axios.put(
      `/api/v1/updateprofile`,
      { name, email },
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    console.log(data);
    dispatch({ type: "updateProfileSuccess", payload: data.message });
  } catch (error) {
    console.log(error);
    dispatch({
      type: "updateProfileFailed",
      payload: error.response.data.message,
    });
  }
};
export const changePassword =
  (oldPassword, newPassword) => async (dispatch) => {
    try {
      dispatch({ type: "changePasswordRequest" });
      const { data } = await axios.put(
        `/api/v1/changepassword`,
        { oldPassword, newPassword },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      dispatch({ type: "changePasswordSuccess", payload: data.message });
    } catch (error) {
      dispatch({
        type: "changePasswordFailed",
        payload: error.response.data.message,
      });
    }
  };
