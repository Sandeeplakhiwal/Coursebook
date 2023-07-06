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
