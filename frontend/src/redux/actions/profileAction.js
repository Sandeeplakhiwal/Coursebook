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
    dispatch({ type: "updateProfileSuccess", payload: data.message });
  } catch (error) {
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

export const updateProfilePicture = (formdata) => async (dispatch) => {
  try {
    dispatch({ type: "updateProfilePictureRequest" });
    const { data } = await axios.put(`/api/v1/updateprofilepic`, formdata, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    });
    dispatch({ type: "updateProfilePictureSuccess", payload: data.message });
  } catch (error) {
    dispatch({
      type: "updateProfilePictureFailed",
      payload: error.response.data.message,
    });
  }
};
